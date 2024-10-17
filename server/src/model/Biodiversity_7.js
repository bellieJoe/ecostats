import mongoose from "mongoose";

const Biodiversity_7_Schema = new mongoose.Schema({
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
    livelihood_projects: {
        type: String,
        required: true
    },
    date_established: {
        type: Date,
        required: true
    },
    beneficiaries: {
        male: {
            type: Number,
            default : 0,
            required: true
        },
        female: {
            type: Number,
            default : 0,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    },
    fund_source: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Biodiversity_7 = mongoose.model('biodiversity_7', Biodiversity_7_Schema);

export default Biodiversity_7;
