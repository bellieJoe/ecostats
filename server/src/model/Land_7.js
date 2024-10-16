import mongoose from "mongoose";

const Land_7_Schema = new mongoose.Schema({
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
  no_of_lots: {
    type: Number,
    required: true,
  },
  total_land_area_ha: {
    type: Number,
    required: true,
  },
  total_forecasted_annual_revenue: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create a model
const Land_7 = mongoose.model('land_7', Land_7_Schema);

export default Land_7;
