import express from "express"
import { createCRUDController } from "../controller/forms/formController.js";
import ReportConfigModel from "../model/ReportConfig.js";

import SectorModel from "../model/Sector.js";

const sector = createCRUDController(SectorModel);


const router = express.Router();

router.get("", sector.getAll);
router.post("", sector.create);
router.put("", sector.update);
router.delete(
    "/:id", 
    async(req, res, next) => {
        try {
            const id = req.params.id;
            if(await ReportConfigModel.exists({ sector : id })){
                return res.status(400).json({
                    error: "Invalid Parameters",
                    msg: "Unable to delete this sector because it is already being used by existing report configurations. Please update or delete the associated report configurations first."
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
    sector.delete
);
router.post("/save-many", sector.saveMany);
router.get("/by-query", async (req, res) => {
    try {
        
        const query = JSON.parse(req.query.query);
        const populate = JSON.parse(req.query.populate);

        const m = await SectorModel.find(query).populate(populate)

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
