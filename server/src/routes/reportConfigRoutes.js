import express from "express"
import { createCRUDController } from "../controller/forms/formController.js";

import ReportConfigModel from "../model/ReportConfig.js";

const reportConfigController = createCRUDController(ReportConfigModel);


const router = express.Router();

router.get("", reportConfigController.getAll);
router.post("", reportConfigController.create);
router.put("", reportConfigController.update);
router.delete("/:id", reportConfigController.delete);
router.post("/save-many", reportConfigController.saveMany);
router.get("/by-query", async (req, res) => {
    try {
        
        const query = JSON.parse(req.query.query);
        const populate = JSON.parse(req.query.populate);

        const m = await ReportConfigModel.find(query).populate(populate)

        return res.json(m)

    } catch (error) {
        console.log(error)
        return res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        ); 
    }
});

export default router;