import mongoose from "mongoose";

const Biodiversity_12_Schema = new mongoose.Schema({
    calendar_year : {
        type : Number,
        required : true,
    },
    province: {
        type: String,
        required: true,
    },
    municipality: {
        type: String,
        required: true,
    },
    permit_type: {
        type: String,
        enum : ["WIC", "WEC", "WREC"],
        required: true,
    },
    number_of_permits_issued: {
        type: Number,
        required: true,
        default: 0,
    },
    revenue_generated: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

Biodiversity_12_Schema.index(
    { calendar_year: 1, province: 1, municipality: 1, permit_type : 1},
    { unique: true }
);

const Biodiversity_12 = mongoose.model('biodiversity_12', Biodiversity_12_Schema);

export default Biodiversity_12;
