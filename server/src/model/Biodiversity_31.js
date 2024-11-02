import mongoose from "mongoose";

const Biodiversity_31_Schema = new mongoose.Schema({
    calendar_year: {
        type: Number,
        required: true,
    },
    name_of_conservation_area: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    municipality: {
        type: String,
        required: true,
    },
    threatened_species: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Other Threatened Species', 'Endangered', 'Critically Endangered', 'Vulnerable', 'Least Concern (rare)']
    },
    no_of_species: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});


// Create the model
const Biodiversity_31 = mongoose.model('biodiversity_31', Biodiversity_31_Schema);

// Export the model
export default Biodiversity_31;
