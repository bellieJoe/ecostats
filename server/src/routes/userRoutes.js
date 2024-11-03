import express from "express"
const router = express.Router()
import { 
    refreshTokenValidation, 
    userLoginValidation, 
    userSignupValidation, 
    getByIdValidation ,
    updateuserValidation,
    assignToUntOrPrgrmValidation
} from "../middleware/validations/userValidations.js";
import { 
    all, 
    login, 
    refreshToken, 
    signup, 
    getUserById ,
    activate,
    deactivate,
    update,
    searchByName,
    assignUserToUnitOrProgram,
    forgotPassword,
    resetPassword
} from "../controller/userController.js";
import UserModel from "../model/User.js";

router.post('/login', userLoginValidation, login);

router.post('/signup', userSignupValidation, signup);

router.put('/update/:id', updateuserValidation, update);

router.post('/activate/:id', activate);

router.post('/deactivate/:id', deactivate);

router.post('/refresh-token', refreshTokenValidation, refreshToken);

router.get('', all);

router.get('/search/:name', searchByName);

router.get('/get-by-id/:id', getUserById);

router.post('/assign-to', assignToUntOrPrgrmValidation, assignUserToUnitOrProgram);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

router.get("/query", async (req, res) => {
    const users = await UserModel.find(req.query.query);
    return res.json(users);
});

export default router;
