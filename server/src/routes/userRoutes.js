import express from "express"
const router = express.Router()
import { refreshTokenValidation, userLoginValidation, userSignupValidation } from "../middleware/validations/userValidations.js";
import { all, login, refreshToken, signup, test } from "../controller/userController.js";

router.post('/login', userLoginValidation, login);

router.post('/signup', userSignupValidation, signup);

router.post('/refresh-token', refreshTokenValidation, refreshToken);

router.get('', all);

router.get('/test', test);



export default router;
