import express from "express"
import { 
    all,
    countPrograms,
    create ,
    deleteProgram,
    getProgramById,
    getProgramHeads,
    removeHead,
    searchProgramByName,
    updateProgram
} from "../controller/programController.js";
import {
    createProgramValidation,
    getProgramHeadsValidation,
    updateProgramValidation
} from "../middleware/validations/programValidations.js";

const router = express.Router()

router.post("/create", createProgramValidation, create);

router.get("/search/:name", searchProgramByName);

router.get("/count", countPrograms);

router.get('', all)

router.get('/heads/:programId', getProgramHeadsValidation, getProgramHeads)

router.delete('/remove-head', removeHead)

router.delete('/delete/:programId', deleteProgram)

router.get('/get-by-id/:programId', getProgramById)

router.put('/update', updateProgramValidation, updateProgram)

export default router;