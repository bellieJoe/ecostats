import { validationResult } from "express-validator";
import UserModel from "../model/User.js";
import ProgramModel from "../model/Program.js";
import UnitModel from "../model/Unit.js";
import UnitHead from "../model/UnitHead.js";
import mongoose, { mongo } from "mongoose";
import UnitHeadModel from "../model/UnitHead.js";


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

export const countUnits = async (req, res) => {
    try {

        const units = await UnitModel.countDocuments({deletedAt:null})

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

export const getByProgram = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const programId = req.query.programId;
        const name = req.query.name; 

        const skip = (page - 1) * limit;

        const total = await UnitModel.countDocuments({
            deletedAt : null,
            programId : programId
        });

        const q = name ? { 
            name : { 
                $regex : name, 
                $options: "i" 
            }, 
            deletedAt : null 
        } : {
            deletedAt  : null
        }

        if(programId) {
            q.programId = programId
        }

        const units = await UnitModel.find(q)
                            .skip(skip)
                            .limit(limit)
                            .select("_id name  createdAt ");

        return res.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            units: units,
        })
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


export const deleteUnit = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const unitId = req.params.unitId;
      
      await UnitModel.findOneAndUpdate({
        _id : unitId
      }, {
        deletedAt : Date.now()
      })
      .session(session);

      await UnitHeadModel.updateMany({
        unitId : unitId,
        deletedAt : null
      }, {
        deletedAt : Date.now()
      })
      .session(session);
      
      await session.commitTransaction();
      res.send();
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        return res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        ); 
    } finally {
        await session.endSession();
    }
}

export const updateUnit = async (req, res) => {
    try {
        const unitId = req.body.id;
        const name = req.body.name;

        const unit = await UnitModel.findOneAndUpdate({
            _id : unitId
        }, {
            name : name
        });

        return res.status(200).json(await UnitModel.findById(unit._id))
       
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

export const getUnitById = async (req, res) => {
    try {
        const unitId = req.params.unitId;

        const unit = await UnitModel.findById(unitId).select("_id name");

        return res.status(200).json(unit)
       
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

