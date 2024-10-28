import mongoose from "mongoose";

const Biodiversity_3_Schema = new mongoose.Schema({
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
    date_of_inventory: {
        type: Date,
        required: true
    },
    area_assessed: {
        type: Number,
        required: true
    },
    status_percentage: {
        type: Number,
        required: true
    },
    dominant_species: {
        type: String,
        required: true
    },
    types_of_substrate: {
        type: String,
        required: true
    },
    condition: {
        quantitative_interpretation : {
            type : Number
        },
        qualitative_interpretation : {
            type : String
        }
    },  
    year_assessed: {
        type: Number,
        required: true
    },
}, { timestamps: true });

Biodiversity_3_Schema.index(
    { calendar_year: 1, province: 1, municipality: 1 },
    { unique: true }
);

const Biodiversity_3 = mongoose.model('biodiversity_3', Biodiversity_3_Schema);

export default Biodiversity_3;
