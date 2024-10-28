import mongoose from "mongoose";

const Land_3_Schema = new mongoose.Schema({
    calendar_year: { // Changed from calendarYear to calendar_year
        type: Number, // Assuming the year is stored as a number (e.g., 2024)
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
    }
}, { timestamps: true }); // Optional: add createdAt and updatedAt timestamps

Land_3_Schema.index(
    { calendar_year: 1, province: 1, municipality: 1 },
    { unique: true }
);


const Land_3 = mongoose.model('land_3', Land_3_Schema);

export default Land_3;
