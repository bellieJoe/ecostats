import mongoose from "mongoose";

const Forestry_10_Schema = new mongoose.Schema({
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


const Forestry_10 = mongoose.model('forestry_10', Forestry_10_Schema);
export default Forestry_10;

