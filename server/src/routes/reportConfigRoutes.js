import express from "express"
import { createCRUDController } from "../controller/forms/formController.js";

import ReportConfigModel from "../model/ReportConfig.js";
import ReportDataModel from "../model/ReportData.js";

const reportConfigController = createCRUDController(ReportConfigModel);


const router = express.Router();

router.get("", reportConfigController.getAll);
router.post("", reportConfigController.create);
router.put("", reportConfigController.update);
router.delete(
    "/:id", 
    async(req, res, next) => {
        try {
            const id = req.params.id;
            if(await ReportDataModel.exists({ report_config_id : id })){
                return res.status(400).json({
                    error: "Invalid Parameters",
                    msg: "Unable to delete this configuration because it already has associated report data. Please update or delete the associated report data first."
                });
            }
            next();
        } catch (error) {
            return res.status(500).json(
                { 
                    error: 'Server error.',
                    msg : "An unexpected error occurred while processing the request. Please contact the system administrator to try fixing the problem."
                }   
            );
        }
    },
    reportConfigController.delete);
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
