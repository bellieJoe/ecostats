import mongoose from "mongoose";

const Forestry_6_Schema = new mongoose.Schema({
    calendar_year: {
        type: Number,
        required: true  
    },
    province: {
        type: String,
        required: true
    },
    municipality: {
        type: String,
        required: true
    },
    organization_name: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    carp: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    beneficiaries: {
        total: {
            type: Number,
            required: true
        },
        male: {
            type: Number,
            required: true
        },
        female: {
            type: Number,
            required: true
        }
    }
}, { timestamps: true });

const Forestry_6 = mongoose.model('forestry_6', Forestry_6_Schema);
export default Forestry_6


