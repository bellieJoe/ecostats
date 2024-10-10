import { body } from "express-validator";

export const userLoginValidation = [
    body("email")
    .exists()
    .notEmpty()
    .isString(),
    body("password")
    .exists()
    .notEmpty()
    .isString()
]

export const refreshTokenValidation = [ 
    body("refreshToken")
    .exists()
    .notEmpty()
    .isString()
]