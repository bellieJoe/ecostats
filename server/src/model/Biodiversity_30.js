import mongoose from "mongoose";

// Define the new schema
const Biodiversity_30_Schema = new mongoose.Schema({
    calendar_year : {
        type : Number,
        required : true
    },
    classification: {
        type: String,
        enum : ["Mammal", "Avian", "Reptile" , "Others"],
        required: true,
    },
    no_of_heads: {
        type: Number,
        required: true,
        min: 0,
    },
    mode_of_acquisition: {
        heads_confiscated: {
            type: Number,
            default: 0, 
        },
        heads_donated: {
            type: Number,
            default: 0, 
        },
        heads_rescued: {
            type: Number,
            default: 0, 
        },
    },
    mortality: {
        type: Number,
        required: true,
        min: 0,
    },
    mode_of_disposition: {
        heads_donated: {
            type: Number,
            default: 0, 
        },
        heads_loaned: {
            type: Number,
            default: 0, 
        },
        heads_turned_over: {
            type: Number,
            default: 0, 
        },
        heads_released: {
            type: Number,
            default: 0, 
        }
    },
}, {
    timestamps: true 
});

Biodiversity_30_Schema.index(
    { calendar_year: 1, classification: 1 },
    { unique: true }
);

// Create the model
const Biodiversity_30 = mongoose.model('biodiversity_30', Biodiversity_30_Schema);

// Export the model
export default Biodiversity_30;
