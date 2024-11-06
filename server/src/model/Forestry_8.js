import mongoose from "mongoose";

const Forestry_8_Schema = new mongoose.Schema({
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

Forestry_8_Schema.index(
    { calendar_year: 1, province: 1, municipality: 1 },
    { unique: true }
);

const Forestry_8 = mongoose.model('forestry_8', Forestry_8_Schema);
export default Forestry_8;

