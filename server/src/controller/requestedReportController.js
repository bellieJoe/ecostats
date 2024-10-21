import { validationResult } from "express-validator";
import UserModel from "../model/User.js";
import ProgramModel from "../model/Program.js";
import ProgramHeadModel from "../model/ProgramHead.js";
import mongoose from "mongoose";
import RequestedReportModel from "../model/RequestedReport.js";

export const create = async (req, res) => {
    try {

        const filters = req.body.filters;
        const fields = req.body.fields;
        const requested_by = req.body.requested_by
        const form_name = req.body.form_name
        
        const requestedReport = new RequestedReportModel({
            filters,
            fields,
            requested_by,
            form_name
        });
        await requestedReport.save();
        
        return res.send();
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        );
    } 
}



