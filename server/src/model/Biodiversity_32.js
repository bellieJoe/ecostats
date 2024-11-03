import mongoose from "mongoose";

// Define the schema for tagged species
const Biodiversity_32_Schema = new mongoose.Schema({
    calendar_year: {
        type: Number,
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
    species: {
        type: String,
        required: true,
    },
    date_encountered: {
        type: Date,
        required: true,
    },
    tag_no: {
        type: String,
        required: true,
    },
    tagging: {
        type: String,
        required: true,
    },
    date_released: {
        type: Date,
        default: null // optional field if not yet released
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the model
const Biodiversity_32 = mongoose.model('biodiversity_32', Biodiversity_32_Schema);

// Export the model
export default Biodiversity_32;
