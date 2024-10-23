import { validationResult } from "express-validator";
import UserModel from "../model/User.js";
import ProgramModel from "../model/Program.js";
import ProgramHeadModel from "../model/ProgramHead.js";
import mongoose from "mongoose";
import RequestedReportModel from "../model/RequestedReport.js";

export const create = async (req, res) => {
    try {

        const title = req.body.title;
        const description = req.body.description;
        const filters = req.body.filters;
        const fields = req.body.fields;
        const requested_by = req.body.requested_by
        const form_name = req.body.form_name
        
        const requestedReport = new RequestedReportModel({
            title,
            description,
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

export const getByQuery = async (req, res) => {
    try {
        const query = { ...req.query };

        const requests = await RequestedReportModel.find(query);

        return res.json(requests);

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

export const deleteReport = async (req, res) => {
    try {
        const id = req.params.id;

        await RequestedReportModel.deleteOne({_id : id});

        return res.json();

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
