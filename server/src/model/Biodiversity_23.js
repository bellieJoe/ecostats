import mongoose from "mongoose";

const Biodiversity_23_Schema = new mongoose.Schema({
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
        enum : ["Angiosperms", "Pteridophytes", "Gymnosperms"],
        required: true,
    },
    no_of_species: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

Biodiversity_23_Schema.index(
    { calendar_year: 1, province: 1, municipality: 1, taxonomic_group : 1},
    { unique: true }
);

const Biodiversity_23 = mongoose.model('biodiversity_23', Biodiversity_23_Schema);

export default Biodiversity_23;
