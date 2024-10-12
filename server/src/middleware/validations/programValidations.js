import { body, param } from "express-validator";
import UserModel from "../../model/User.js";

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
]