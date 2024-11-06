import mongoose from "mongoose";

const Forestry_9_Schema = new mongoose.Schema({
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

Forestry_9_Schema.index(
    { calendar_year: 1, province: 1, municipality: 1 },
    { unique: true }
);

const Forestry_9 = mongoose.model('forestry_9', Forestry_9_Schema);
export default Forestry_9;

