import mongoose from "mongoose";

const Biodiversity_4_Schema = new mongoose.Schema({
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
    area: {
        type: Number, // Area in hectares
        required: true
    },
    date_of_inventory: {
        type: Date,
        required: true
    },
    dominant_species: {
        type: String, // Array to hold multiple species names
        required: true
    },
    status: {
        type: String, // Array to hold multiple species names
        required: true
    }
}, { timestamps: true });

const Biodiversity_4 = mongoose.model('biodiversity_4', Biodiversity_4_Schema);

export default Biodiversity_4;
