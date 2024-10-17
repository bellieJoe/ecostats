import mongoose from "mongoose";

const Biodiversity_5_Schema = new mongoose.Schema({
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
    assessed_area: {
        type: Number, // Area in hectares
        required: true
    },
    date_of_assessment: {
        type: Date,
        required: true
    },
    species_identified: {
        type: String, 
        required: true
    }
}, { timestamps: true });

const Biodiversity_5 = mongoose.model('biodiversity_5', Biodiversity_5_Schema);

export default Biodiversity_5;
