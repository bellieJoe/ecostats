import express from "express"
import { 
    countUnits,
    create, 
    searchUnitByName
} from "../controller/unitController.js";
import {
    createUnitValidation
} from "../middleware/validations/programValidations.js";

const router = express.Router()

router.post("/create", createUnitValidation, create);

router.get("/search/:name", searchUnitByName);

router.get("/count", countUnits);


export default router;