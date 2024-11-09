import mongoose from "mongoose";

const SectorSchema = new mongoose.Schema({
    calendar_year : {
        type : Number,
        required : true
    },
    identifier: {
        type: String,
        required: true
    },
    name : {
        type : String,
        required : true
    },
}, { timestamps: true });

SectorSchema.index(
    { calendar_year: 1, identifier : 1 },   
    { unique: true }
);

const SectorModel = mongoose.model('sectors', SectorSchema);

export default SectorModel;



