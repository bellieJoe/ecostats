import express from "express"
import { 
    create ,
    searchProgramByName
} from "../controller/programController.js";
import {
    createProgramValidation
} from "../middleware/validations/programValidations.js";

const router = express.Router()

router.post("/create", createProgramValidation, create);

router.get("/search/:name", searchProgramByName);

export default router;