import express from "express"
import { 
    all,
    countPrograms,
    create ,
    getProgramHeads,
    removeHead,
    searchProgramByName
} from "../controller/programController.js";
import {
    createProgramValidation,
    getProgramHeadsValidation
} from "../middleware/validations/programValidations.js";

const router = express.Router()

router.post("/create", createProgramValidation, create);

router.get("/search/:name", searchProgramByName);

router.get("/count", countPrograms);

router.get('', all)

router.get('/heads/:programId', getProgramHeadsValidation, getProgramHeads)

router.delete('/remove-head', removeHead)

export default router;