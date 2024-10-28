import mongoose from "mongoose";

const Land_5_Schema = new mongoose.Schema({
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
  no_of_transmitted_to_rod: {
    type: Number,
    required: true
  },
  area_ha: {
    type: Number,
    required: true
  },
  total_beneficiaries: {
    type: Number,
    required: true
  },
  female_beneficiaries: {
    type: Number,
    required: true
  },
  male_beneficiaries: {
    type: Number,
    required: true
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

Land_5_Schema.index(
  { calendar_year: 1, province: 1, municipality: 1 },
  { unique: true }
);

// Create a model
const Land_5 = mongoose.model('land_5', Land_5_Schema);

export default Land_5;
