import mongoose from "mongoose";

const Forestry_11_Schema = new mongoose.Schema({
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


const Forestry_11 = mongoose.model('forestry_11', Forestry_11_Schema);
export default Forestry_11;

