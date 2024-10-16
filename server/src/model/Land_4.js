import mongoose from "mongoose";

const Land_4_Schema = new mongoose.Schema({
    province: {
        type: String,
        required: true,
    },
    calendar_year: { // Changed from calendarYear to calendar_year
        type: Number, // Assuming the year is stored as a number (e.g., 2024)
        required: true,
    },
    other_patents : {
        type: Number,
        required: true,
    },
    patents: {
        current: {
            transmitted_to_RoD: { // Changed from transmittedToRoD to transmitted_to_RoD
                type: Number,
                required: true,
            },
            area: {
                type: Number, // You can modify this type based on how you store area data
                required: true,
            },
            beneficiaries: {
                total: {
                    type: Number,
                    required: true,
                },
                female: {
                    type: Number,
                    required: true,
                },
                male: {
                    type: Number,
                    required: true,
                },
            },
        },
        historical: {
            transmitted_to_RoD: { // Changed from transmittedToRoD to transmitted_to_RoD
                type: Number,
                required: true,
            },
            area: {
                type: Number,
                required: true,
            },
            beneficiaries: {
                total: {
                    type: Number,
                    required: true,
                },
                female: {
                    type: Number,
                    required: true,
                },
                male: {
                    type: Number,
                    required: true,
                },
            },
        },
    },
}, { timestamps: true }); // Optional: add createdAt and updatedAt timestamps

const Land_4 = mongoose.model('land_4', Land_4_Schema);

export default Land_4;
