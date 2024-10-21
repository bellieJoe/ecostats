import mongoose from "mongoose";

const Biodiversity_6_Schema = new mongoose.Schema({
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
    },
    rehabilitated_area: {
        type: Number, // Area in hectares
        required: true
    },
    date_established: {
        type: Number
    },
    date_rehabilitated: {
        type: Number,
        required: true
    },
    species_identified: {
        type: String, // Can be a single species or a list of species as a comma-separated string
        required: true
    },
    fund_source: {
        type: String,
        // required: true
    }
}, { timestamps: true });

const Biodiversity_6 = mongoose.model('biodiversity_6', Biodiversity_6_Schema);

export default Biodiversity_6;
