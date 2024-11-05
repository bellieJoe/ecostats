import mongoose from "mongoose"

// Define the Species schema
const Biodiversity_28_Schema = new mongoose.Schema({
    // calendar_year: {
    //     type: Number,
    //     required: true,
    //     min: 0,
    //     default : "2024"
    // },
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
const Biodiversity_28 = mongoose.model('biodiversity_28', Biodiversity_28_Schema);

// Export the model
export default Biodiversity_28;
