import mongoose from "mongoose";

const Biodiversity_22_Schema = new mongoose.Schema({
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
        enum : ["Birds", "Mammals", "Reptiles", "Amphibians", "Invertebrates"],
        required: true,
    },
    no_of_species: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

Biodiversity_22_Schema.index(
    { calendar_year: 1, province: 1, municipality: 1, taxonomic_group : 1},
    { unique: true }
);

const Biodiversity_22 = mongoose.model('biodiversity_22', Biodiversity_22_Schema);

export default Biodiversity_22;