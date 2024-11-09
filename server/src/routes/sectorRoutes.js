import express from "express"
import { createCRUDController } from "../controller/forms/formController.js";

import SectorModel from "../model/Sector.js";

const sector = createCRUDController(SectorModel);


const router = express.Router();

router.get("", sector.getAll);
router.post("", sector.create);
router.put("", sector.update);
router.delete("/:id", sector.delete);
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
