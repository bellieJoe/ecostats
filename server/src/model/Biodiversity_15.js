import mongoose from "mongoose";

const Biodiversity_15_Schema = new mongoose.Schema({
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
    taxonomic_group: {
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

Biodiversity_15_Schema.index(
    { calendar_year: 1, province: 1, municipality: 1, taxonomic_group : 1},
    { unique: true }
);

const Biodiversity_15 = mongoose.model('biodiversity_15', Biodiversity_15_Schema);

export default Biodiversity_15;
