import mongoose from "mongoose";

const Forestry_14_Schema = new mongoose.Schema({
    calendar_year: {
        type: Number,
        required: true  
    },
    tourism_purpose: {
        type: String,
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
        type: Number,
        required: true
    }
}, { timestamps: true });

Forestry_14_Schema.index(
    { tourism_purpose : 1, calendar_year: 1, province: 1, municipality: 1 },
    { unique: true }
);

const Forestry_14 = mongoose.model('forestry_14', Forestry_14_Schema);
export default Forestry_14;

