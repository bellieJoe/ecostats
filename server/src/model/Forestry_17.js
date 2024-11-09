import mongoose from "mongoose";

const Forestry_17_Schema = new mongoose.Schema({
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
    area: {
        type: Number,
        required: true
    }
}, { timestamps: true });

Forestry_17_Schema.index(
    { calendar_year: 1, province: 1, municipality: 1 },
    { unique: true }
);

const Forestry_17 = mongoose.model('forestry_17', Forestry_17_Schema);
export default Forestry_17;

