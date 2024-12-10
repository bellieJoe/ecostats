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
    resetPassword,
    verifyAccount,
    resendEmail,
    isEmailUsed,
    registerUser,
    sendRegistrationEmail,
    test
} from "../controller/userController.js";
import UserModel from "../model/User.js";
import RequestedReportModel from "../model/RequestedReport.js"

router.post('/login', userLoginValidation, login);

router.post('/signup', userSignupValidation, signup);

router.post('/register-user', userSignupValidation, registerUser);

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

router.get('/verify-account/:token', verifyAccount);

router.post('/resend-verification/:email', resendEmail);

router.get("/query", async (req, res) => {
    const users = await UserModel.find(req.query.query);
    return res.json(users);
});

router.get('/is-email-used/:email', isEmailUsed);

router.get('/count-reports-for-approval/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // return res.json(userId);

        const user = await UserModel.findById(userId).populate(["units", {
            path: "programs",
            populate: {
                path: "units"
            }
        }]);

        const toReviewUnits = [
            ...user.units.map(unit => unit._id),
        ];
        const toApproveUnits = [
            ...user.programs.flatMap(program => program.units.map(unit => unit._id))
        ]

        const toReviewCount = await RequestedReportModel.find({
            unit_id : {
                $in : toReviewUnits
            },
            approved_at : null,
            reviewed_at: null,
            rejected_by: null
        }).countDocuments();

        const toApproveCount = await RequestedReportModel.find({
            unit_id : {
                $in : toApproveUnits
            },
            approved_at : null,
            reviewed_at: {
                $ne : null
            },
            rejected_by: null
        }).countDocuments();


        return res.json({
            toReview : toReviewCount,
            toApprove : toApproveCount
        });

        

        // const units = 
        return res.json(user);
        
    } catch (error) {
        console.log(error)
        res.status(500).json(
            { 
                error: 'Server error',
                details : error
            }   
        );
    } 
});

router.get('/test', test);




export default router;
