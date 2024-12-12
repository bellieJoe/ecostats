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
import RequestedReportModel from "../model/RequestedReport.js";
import SectorModel from "../model/Sector.js";
import ProgramModel from "../model/Program.js";
import UnitModel from "../model/Unit.js";

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

router.get("/admin-overview-data", async (req, res) => {
    try {
        const year = parseInt(req.query.year);
        if (isNaN(year)) {
            return res.status(400).json({ error: "Valid year is required" });
        }

        // Filter sectors by the given year
        const sectors = await SectorModel.find({ calendar_year: year, deletedAt: null });
        const sectorIds = sectors.map((sector) => sector._id);
        const programs = await ProgramModel.find({ sector_id: { $in: sectorIds }, deletedAt: null });
        const programIds = programs.map((program) => program._id);

        // Count total users
        const totalUsers = await UserModel.countDocuments();

        // Count total programs under the sectors for the year
        const totalPrograms = await ProgramModel.countDocuments({ sector_id: { $in: sectorIds }, deletedAt: null });

        // Count total units under the programs for the sectors in the year
        const totalUnits = await UnitModel.countDocuments({ programId: { $in: programIds }, deletedAt: null });

        // Unit chart data (units and their focal person count)
        // Unit chart data (units and their focal person count)
        const unitChartData = await UnitModel.aggregate([
            { $match: { programId: { $in: programIds }, deletedAt: null } }, // Match units under the programs for the given year
            {
                $lookup: {
                    from: "focal_people", // Focal persons collection
                    let: { unitId: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$unitId", "$$unitId"] }, deletedAt: null } }, // Match focal persons by unitId
                    ],
                    as: "focals", // Attach matching focal persons
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    focalCount: { $size: "$focals" }, // Count focal persons for the unit
                },
            },
            {
                $sort: { focalCount: -1 } // Sort by focal person count in descending order
            }
        ]);


        // Division chart data (programs and their focal person count)
        const divisionChartData = await ProgramModel.aggregate([
            { $match: { sector_id: { $in: sectorIds }, deletedAt: null } },
            {
                $lookup: {
                    from: "units",
                    localField: "_id",
                    foreignField: "programId",
                    as: "units",
                },
            },
            { $unwind: { path: "$units", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "focal_people",
                    let: { unitId: "$units._id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$unitId", "$$unitId"] }, deletedAt: null } },
                    ],
                    as: "focals",
                },
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    focalCount: { $sum: { $size: "$focals" } },
                },
            },
            {
                $sort: { focalCount: -1 } // Sort by focal person count in descending order
            }
        ]);



        // Construct the final response object
        const dashboardData = {
            total_users: totalUsers,
            total_programs: totalPrograms,
            total_units: totalUnits,
            unitChartData,
            divisionChartData,
        };

        return res.json(dashboardData);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Server error",
            details: error.message,
        });
    }
});


router.get('/test', test);




export default router;


