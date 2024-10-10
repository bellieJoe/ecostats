import express from "express"
const router = express.Router()
import { refreshTokenValidation, userLoginValidation } from "../middleware/validations/userValidations.js";
import { all, login, refreshToken } from "../controller/userController.js";

router.post('/login', userLoginValidation, login);

router.post('/refresh-token', refreshTokenValidation, refreshToken);

router.get('', all);



export default router;
