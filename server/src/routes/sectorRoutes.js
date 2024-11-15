import express from "express"
import { createCRUDController } from "../controller/forms/formController.js";
import ReportConfigModel from "../model/ReportConfig.js";
import mongoose from "mongoose";

import SectorModel from "../model/Sector.js";
import ChartConfigModel from "../model/ChartConfig.js";

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

router.post("/copy-all-sector-configs", async (req, res) => {
    const { base_on, for_year } = req.body;
    
    if (!base_on || !for_year || base_on === for_year) {
        return res.status(400).json({
            error: "Invalid Parameters",
            msg: `Invalid or duplicate years provided. Base year: ${base_on}, For year: ${for_year}`,
        });
    }

    const session = await mongoose.startSession(); // Start a session for transactions
    session.startTransaction();
    try {

        // Step 1: Fetch all sectors for the base year
        const oldSectors = await SectorModel.find({ calendar_year: base_on }).session(session);

        if (oldSectors.length <= 0) {
            return res.status(404).json({
                error: "Not Found",
                msg: `No sectors found for the specified base year: ${base_on}`,
            });
        }

        const newSectorConfigs = [];

        console.log("working")
        

        // Step 2: Duplicate each sector and its configurations
        for (const oldSector of oldSectors) {
            // Create the new sector for the target year
            const newSector = await SectorModel.create(
                [{
                    calendar_year: for_year,
                    identifier: oldSector.identifier, // Retain the same identifier
                    name: oldSector.name,            // Retain the same name
                }],
                { session }
            );

            // Fetch configurations for the old sector
            const oldConfigs = await ReportConfigModel.find({ sector: oldSector._id }).session(session);

            if (!oldConfigs.length) {
                console.warn(`No configurations found for sector: ${oldSector.identifier}`);
                continue;
            }

            // Step 3: Duplicate configurations and their associated charts
            const newConfigs = await Promise.all(
                oldConfigs.map(async (config) => {
                    const newConfigData = {
                        ...config.toObject(),
                        sector: newSector[0]._id, // Associate with the new sector
                    };
                    delete newConfigData._id;
                    delete newConfigData.createdAt;
                    delete newConfigData.updatedAt;

                    const createdConfig = await ReportConfigModel.create([newConfigData], { session });

                    // Copy associated charts
                    const oldCharts = await ChartConfigModel.find({ report_config_id: config._id }).session(session);
                    const newCharts = await Promise.all(
                        oldCharts.map(async (chart) => {
                            const newChartData = {
                                ...chart.toObject(),
                                report_config_id: createdConfig[0]._id, // Associate with the new config
                            };
                            delete newChartData._id;
                            delete newChartData.createdAt;
                            delete newChartData.updatedAt;

                            return await ChartConfigModel.create([newChartData], { session });
                        })
                    );

                    return { config: createdConfig[0], charts: newCharts };
                })
            );

            newSectorConfigs.push({ newSector: newSector[0], newConfigs });
        }

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: "Sectors, configurations, and charts copied successfully.",
            data: newSectorConfigs,
        });
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
