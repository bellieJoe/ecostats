import mongoose from "mongoose";

const Biodiversity_8_Schema = new mongoose.Schema({
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
    name_of_wetland: {
        type: String,
        required: true
    },
    wetland_type: {
        type: String,
        required: true
    },
    wet_area_dry_season_ha: {
        type: Number,
        required: true
    },
    wet_area_wet_season_ha: {
        type: Number,
        required: true
    },
    assessed: {
        type: String,
        enum: ["Yes", "No"],
        required: true
    },
    presence_of_management_plan: {
        type: String,
        enum: ["Yes", "No"],
        required: true
    },
    recognition: {
        type: String
    },
    remarks: {
        type: String
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Biodiversity_8 = mongoose.model('biodiversity_8', Biodiversity_8_Schema);

export default Biodiversity_8;
