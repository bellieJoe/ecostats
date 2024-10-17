import mongoose from "mongoose";

const Forestry_5_Schema = new mongoose.Schema({
    calendar_year: {
        type: Number,
        required : true
    },
    province: {
        type: String,
        required : true
    },
    name_of_watershed: {
        type: String,
        required : true
    },
    previous_name_of_watershed: {
        type: String,
        required : true
    },
    area_ha: {
        type: Number,
        required : true
    },
    classification: {
        type: String,
        enum: ["Small sized watershed", "Medium sized watershed", "Large sized watershed", "Extremely Large sized watershed"],
        required: true,
    },
    municipalities: {
        type: [String], // Array of strings to hold multiple municipalities
        required: true,
    },
}, { timestamps: true });

const Forestry_5 = mongoose.model('forestry_5', Forestry_5_Schema);

export default Forestry_5;
