import express from "express"
import { 
    countUnits,
    create, 
    deleteUnit, 
    getByProgram, 
    getUnitById, 
    getUnitHeads, 
    removeHead, 
    searchUnitByName,
    updateUnit
} from "../controller/unitController.js";
import {
    createUnitValidation,
    getUnitHeadsValidation,
    updateUnitValidation
} from "../middleware/validations/programValidations.js";
import { deleteProgram } from "../controller/programController.js";

const router = express.Router()

router.post("/create", createUnitValidation, create);

router.get("/search/:name", searchUnitByName);

router.get("/count", countUnits);

router.get("/all", getByProgram);

router.delete("/delete/:unitId", deleteUnit);

router.put("/update",updateUnitValidation, updateUnit);

router.get('/get-by-id/:unitId', getUnitById)

router.get('/heads/:unitId', getUnitHeadsValidation, getUnitHeads)

router.delete('/remove-head', removeHead)


export default router;