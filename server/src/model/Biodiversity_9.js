import mongoose from "mongoose";

const Biodiversity_9_Schema = new mongoose.Schema({
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
    barangay: {
        type: String,
        required: true
    },
    name_of_cave: {
        type: String,
        required: true
    },
    other_cave_name: {
        type: String,
        default : null
    },
    classification_per_dmc: {
        type: String,
        required: true
    },
    dmc_no: {
        type: String,
        required: true
    },
    presence_of_management_plan: {
        type: String,
        enum: ["Yes", "No"],
        required: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Biodiversity_9 = mongoose.model('biodiversity_9', Biodiversity_9_Schema);

export default Biodiversity_9;
