import express from "express"
import { 
    create,
    deleteReport,
    getByQuery
} from "../controller/requestedReportController.js";
import { deleteModel } from "mongoose";


const router = express.Router()

router.post("/create", create);
router.get("/get-by-query", getByQuery);
router.delete("/delete/:id", deleteReport);


export default router;