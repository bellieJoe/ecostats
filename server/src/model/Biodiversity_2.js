import mongoose from "mongoose";

const Biodiversity_2_Schema = new mongoose.Schema({
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
    coastal_resource: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Biodiversity_2 = mongoose.model('biodiversity_2', Biodiversity_2_Schema);

export default Biodiversity_2;
