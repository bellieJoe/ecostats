import { validationResult } from "express-validator";
import UserModel from "../model/User.js";
import ProgramModel from "../model/Program.js";
import UnitModel from "../model/Unit.js";
import UnitHead from "../model/UnitHead.js";
import mongoose from "mongoose";


export const create = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(422).json({errors: errors.array()})

        const userId = req.body.userId;
        const name = req.body.name;
        const programId = req.body.programId;

        const user = await UserModel.findById(userId);
        const unit = new  UnitModel({
            name: name,
            programId : programId
        });
        await unit.save();
        const unitHead = new UnitHead({
            userId : user,
            unitId : unit
        });
        await unitHead.save();

        await session.commitTransaction();

        return res.send();
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        );
    } finally {
        session.endSession();
    }
}

export const searchUnitByName = async (req, res) => {
    try {
        const name = req.params.name; 

        const units = await UnitModel.find({ name : { $regex : name, $options: "i" }, deletedAt : null})
            .select("_id name createdAt");

        return res.json(units)
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        ); 
    }
}