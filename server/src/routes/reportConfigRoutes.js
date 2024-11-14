import express from "express"
import { createCRUDController } from "../controller/forms/formController.js";
import mongoose from "mongoose";

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
router.put("/update-field",
    async (req, res) => {
        try {
            const { report_config_id, updatedData, identifier } = req.body;
            const reportConfig = await ReportConfigModel.findOne({ _id: report_config_id });
            console.log(updatedData, identifier)
            if (!reportConfig) {
                return res.status(404).json({
                    error: "Invalid Parameters",
                    msg: "Cant find the report configurations."
                });
            }

            // Recursive function to locate and update the nested field by _id
            function findAndUpdateField(fields) {
                for (let field of fields) {
                    // Check if this field's _id matches
                    if (field.identifier == identifier) {
                        console.log("field", field);
                        Object.assign(field, updatedData); // Update the field with new data
                        console.log("updated field", field);
                        return true; // Field found and updated
                    }

                    // If it has children, recursively search within them
                    if (field.is_nested && field.children && field.children.length > 0) {
                        const found = findAndUpdateField(field.children);
                        if (found) return true; // Stop searching once field is found
                    }
                }
                return false; // Field not found
            }

            // Update the field if it exists in the nested structure
            
            const fieldUpdated = findAndUpdateField(reportConfig.fields);
            if (!fieldUpdated) {
                return res.status(404).json({
                    error: "Not Found",
                    msg: "Error, field was not found"
                });
            }

            // Save the updated document
            // console.log("updated config", reportConfig);
            reportConfig.markModified('fields');
            await reportConfig.save();
            console.log("updated already")
            return res.json(reportConfig);
        } catch (error) {
            return res.status(500).json(
                { 
                    error: 'Server error.',
                    details : error
                }   
            ); 
        }
    }
)

export default router;
