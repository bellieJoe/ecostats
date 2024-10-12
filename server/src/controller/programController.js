import { validationResult } from "express-validator";
import UserModel from "../model/User.js";
import ProgramModel from "../model/Program.js";
import ProgramHeadModel from "../model/ProgramHead.js";
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

        const user = await UserModel.findById(userId);
        const program = new ProgramModel({
            name: name
        });
        await program.save();
        const programHead = new ProgramHeadModel({
            user : user,
            program : program
        });
        await programHead.save();

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