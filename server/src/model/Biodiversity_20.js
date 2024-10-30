import mongoose from "mongoose";

const Biodiversity_20_Schema = new mongoose.Schema({
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
    number_of_permits_issued: {
        type: Number,
        required: true,
    },
    revenue_generated: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

Biodiversity_20_Schema.index(
    { calendar_year: 1, province: 1, municipality: 1},
    { unique: true }
);

const Biodiversity_20 = mongoose.model('biodiversity_20', Biodiversity_20_Schema);

export default Biodiversity_20;
