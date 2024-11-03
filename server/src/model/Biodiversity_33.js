import mongoose from "mongoose";

// Define the Species schema
const Biodiversity_33_Schema = new mongoose.Schema({
    calendar_year: {
        type: Number,
        required: true,
    },
    species: {
        type: String,
        required: true,
    },
    numbers: {
        released: {
            type: Number,
            required: true,
            min: 0,
        },
        mortality: {
            type: Number,
            required: true,
            min: 0,
        },
        under_rehabilitation: {
            type: Number,
            required: true,
            min: 0,
        },
        total: {
            type: Number,
            required: true,
            min: 0,
        }
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the model
const Biodiversity_33 = mongoose.model('biodiversity_33', Biodiversity_33_Schema);

// Export the model
export default Biodiversity_33;
