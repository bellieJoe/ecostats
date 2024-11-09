import mongoose from "mongoose";

const Forestry_19_Schema = new mongoose.Schema({
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

Forestry_19_Schema.index(
    { calendar_year: 1, province: 1, municipality: 1 },
    { unique: true }
);

const Forestry_19 = mongoose.model('forestry_19', Forestry_19_Schema);
export default Forestry_19;

