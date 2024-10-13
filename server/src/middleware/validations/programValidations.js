import { body, param } from "express-validator";
import UserModel from "../../model/User.js";
import mongoose from "mongoose";
import ProgramModel from "../../model/Program.js";
import UnitModel from "../../model/Unit.js";

export const createProgramValidation = [
    body("userId")
    .exists().withMessage("User Id is required.")
    .notEmpty().withMessage("User should not be empty")
    .custom(async (value) => {
        if(!value){
            return
        }
        const exist = await UserModel.findById(value);
        if(!exist){
            throw new Error("Division Head should be an existing user.")
        }
    }),

    body("name")
    .exists().withMessage("Name is required.")
    .notEmpty().withMessage("Name should not be empty")
    .custom(async (value) => {
        if(!value){
            return
        }
        const exist = await ProgramModel.findOne({name : value, deletedAt : null});
        if(exist){
            throw new Error("Duplicate name detected, this name is already used.");
        }
    }),
]

export const createUnitValidation = [
    body("userId")
    .exists().withMessage("User Id is required.")
    .notEmpty().withMessage("User should not be empty")
    .custom(async (value) => {
        if(!value){
            return
        }
        if(!mongoose.Types.ObjectId.isValid(value)){
            throw new Error("Unit Head should be an existing user.")
        }
        const exist = await UserModel.findById(value);
        if(!exist){
            throw new Error("Unit Head should be an existing user.")
        }
    }),

    body("programId")
    .exists().withMessage("Program is required.")
    .notEmpty().withMessage("Program should not be empty")
    .custom(async (value) => {
        if(!value){
            return
        }
        if(!mongoose.Types.ObjectId.isValid(value)){
            throw new Error("Program should be an existing program.")
        }
        const exist = await ProgramModel.findOne({_id: value, deletedAt : null});
        if(!exist){
            throw new Error("Program should be an existing program.")
        }
    }),

    body("name")
    .exists().withMessage("Name is required.")
    .notEmpty().withMessage("Name should not be empty")
    .custom(async (value) => {
        if(!value){
            return
        }
        const exist = await UnitModel.findOne({name : value, deletedAt : null});
        if(exist){
            throw new Error("Duplicate name detected, this name is already used.")
        }
    }),
]

export const getProgramHeadsValidation = [
    param("programId")
    .custom(async (value) => {
        if(!mongoose.Types.ObjectId.isValid(value)){
            throw new Error("Program is invalid")
        }
        const program = await ProgramModel.findById(value);
        if(!program){
            throw new Error("Program does not exist.")
        }
        return true;
    })
]