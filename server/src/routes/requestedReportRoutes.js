import express from "express"
import { 
    create,
    getByQuery
} from "../controller/requestedReportController.js";


const router = express.Router()

router.post("/create", create);
router.get("/get-by-query", getByQuery);


export default router;