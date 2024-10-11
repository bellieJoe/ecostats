import express from "express"
const router = express.Router()
import { 
    refreshTokenValidation, 
    userLoginValidation, 
    userSignupValidation, 
    getByIdValidation 
} from "../middleware/validations/userValidations.js";
import { 
    all, 
    login, 
    refreshToken, 
    signup, 
    test, 
    getUserById ,
    activate,
    deactivate
} from "../controller/userController.js";

router.post('/login', userLoginValidation, login);

router.post('/signup', userSignupValidation, signup);

router.post('/activate/:id', activate);

router.post('/deactivate/:id', deactivate);

router.post('/refresh-token', refreshTokenValidation, refreshToken);

router.get('', all);

router.get('/get-by-id/:id', getUserById);

router.get('/test', test);



export default router;
