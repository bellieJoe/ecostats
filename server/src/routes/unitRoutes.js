import express from "express"
import { 
    create, 
    searchUnitByName
} from "../controller/unitController.js";
import {
    createUnitValidation
} from "../middleware/validations/programValidations.js";

const router = express.Router()

router.post("/create", createUnitValidation, create);

router.get("/search/:name", searchUnitByName);


export default router;