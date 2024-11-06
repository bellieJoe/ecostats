import mongoose from "mongoose";

const Forestry_7_Schema = new mongoose.Schema({
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
    location: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Forestry_7 = mongoose.model('forestry_7', Forestry_7_Schema);
export default Forestry_7;

