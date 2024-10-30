import mongoose from "mongoose";

const Biodiversity_21_Schema = new mongoose.Schema({
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
    number_of_cto_issued: {
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

Biodiversity_21_Schema.index(
    { calendar_year: 1, province: 1, municipality: 1},
    { unique: true }
);

const Biodiversity_21 = mongoose.model('biodiversity_21', Biodiversity_21_Schema);

export default Biodiversity_21;
