import mongoose from "mongoose";

const Biodiversity_11_Schema = new mongoose.Schema({
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
    number_of_cwr_issued_previous: {
        type: Number,
        required: true,
    },
    number_of_cwr_issued: {
        type: Number,
        required: true,
    },
    revenue_generated: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

Biodiversity_11_Schema.index(
    { calendar_year: 1, province: 1, municipality: 1},
    { unique: true }
);

const Biodiversity_11 = mongoose.model('biodiversity_11', Biodiversity_11_Schema);

export default Biodiversity_11;
