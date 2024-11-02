import mongoose from "mongoose"

// Define the Species schema
const Biodiversity_29_Schema = new mongoose.Schema({
    species : {
        common_name: {
            type: String,
            required: true,
        },
        scientific_name: {
            type: String,
            required: true,
        },
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    mode_of_acquisition: {
        type: String,
        required: true,
    },
    donor: {
        type: String,
        default: null, // Donor is optional
    },
    physical_condition: {
        type: String,
        default: null,
    },
    action_taken: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the model
const Biodiversity_29 = mongoose.model('biodiversity_29', Biodiversity_29_Schema);

// Export the model
export default Biodiversity_29;
