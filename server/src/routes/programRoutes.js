import express from "express"
import { 
    create 
} from "../controller/programController.js";
import {
    createProgramValidation
} from "../middleware/validations/programValidations.js";

const router = express.Router()

router.post("/create", createProgramValidation, create);

export default router;