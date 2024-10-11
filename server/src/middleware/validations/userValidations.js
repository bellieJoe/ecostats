import { body } from "express-validator";
import UserModel from "../../model/User.js";
import RoleModel from "../../model/Role.js";

export const userLoginValidation = [
    body("email").exists().notEmpty().isString().isEmail(),
    body("password").exists().notEmpty().isString()
]

export const userSignupValidation = [
    body("name")
    .exists().withMessage("Name is required")
    .notEmpty().withMessage("Name must not be empty")
    .isString().withMessage("Name must be string"),

    body("email")
    .exists().withMessage("Email is required")
    .notEmpty().withMessage("Email must not be empty")
    .isString().withMessage("Email must be a valid string")
    .isEmail().withMessage("Incorrect email format")
    .custom(async(value) => {
        const isExist = await UserModel.exists({email: value});
        if(isExist){
            throw new Error('Email is already registered.');
        }
        return true;
    }),

    body("password")
    .exists().withMessage("Password is required")
    .notEmpty().withMessage("Password must not be empty"),

    body("userRole")
    .exists().withMessage("Role is required")
    .notEmpty().withMessage("Role must not be empty")
    .isString().withMessage("Role must be string")
    .custom(async (value) => {
        const isExist = await RoleModel.exists({value: value});
        if(!isExist){
            throw new Error('Invalid User Role.');
        }
        return true;
    })
]

export const refreshTokenValidation = [ 
    body("refreshToken").exists().notEmpty().isString()
]