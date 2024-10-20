import { validationResult } from "express-validator";
import UserModel from "../model/User.js";
import ProgramModel from "../model/Program.js";
import ProgramHeadModel from "../model/ProgramHead.js";
import mongoose from "mongoose";
import UnitModel from "../model/Unit.js";
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

        const user = await UserModel.findById(userId);
        const program = new ProgramModel({
            name: name
        });
        await program.save({session});
        const programHead = new ProgramHeadModel({
            userId : user,
            programId : program
        });
        await programHead.save({session});

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

export const searchProgramByName = async (req, res) => {
    try {
        const name = req.params.name; 

        const programs = await ProgramModel.find({ name : { $regex : name, $options: "i" }, deletedAt : null})
            .select("_id name createdAt");

        return res.json(programs)
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

export const countPrograms = async (req, res) => {
    try {

        const programs = await ProgramModel.countDocuments({
            deletedAt: null
        })
        return res.json(programs)
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

export const all = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const name = req.query.name; 

        const skip = (page - 1) * limit;

        const total = await ProgramModel.countDocuments();

        const q = name ? { name : { $regex : name, $options: "i" }, deletedAt : null } : {deletedAt  : null}

        const programs = await ProgramModel.find(q)
                            .skip(skip)
                            .limit(limit)
                            .select("_id name createdAt ");

        return res.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            programs: programs,
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

export const getProgramHeads = async (req, res) => {
    try {
        const programId = req.params.programId;

        const programHeads = await ProgramHeadModel.find({
            programId: programId,
            deletedAt : null
        })
        .populate({
            path: "userId",
            select: "_id name email createdAt"
        });

        return res.json(programHeads.map(p => p.userId))
       
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

export const removeHead = async (req, res) => {
    try {
        const userId = req.query.userId;
        const programId = req.query.programId;

        const programHead = await ProgramHeadModel.findOne({
            userId, programId, deletedAt : null
        });
        programHead.deletedAt = Date.now()
        await programHead.save();

        return res.status(200).send()
       
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

export const deleteProgram = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const programId = req.params.programId
       
      // delete programs
      await ProgramModel.findOneAndUpdate({
        _id : programId
      }, {
        deletedAt : Date.now()
      })
      .session(session);

      await ProgramHeadModel.updateMany({
        programId : programId,
        deletedAt : null
      }, {
        deletedAt : Date.now()
      })
      .session(session);

      await UnitModel.updateMany({
        programId : programId,
        deletedAt : null
      } , {
        deletedAt : Date.now()
      })
      .session(session);

      const unitIds = (await UnitModel.find({
        programId : programId
      })
      .session(session)).map(p => p._id);

      await UnitHeadModel.updateMany({
        unitId: {
            $in : unitIds
        },
        deletedAt : null
      }, {
        deletedAt : Date.now()
      })
      .session(session);
      
      await session.commitTransaction();
      res.send();
    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        return res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        ); 
    } finally {
        await session.endSession()
    }
}

export const getProgramById = async (req, res) => {
    try {
        const programId = req.params.programId;

        const program = await ProgramModel.findById(programId).select("_id name");

        return res.status(200).json(program)
       
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

export const updateProgram = async (req, res) => {
    try {
        const programId = req.body.id;
        const name = req.body.name;

        const program = await ProgramModel.findOneAndUpdate({
            _id : programId
        }, {
            name : name
        });

        return res.status(200).json(await ProgramModel.findById(program._id))
       
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


