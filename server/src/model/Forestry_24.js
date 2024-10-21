import mongoose from "mongoose";

const Forestry_24_Schema = new mongoose.Schema({
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
  number_of_chainsaw_registered: {
    type: Number,
    required: true,
  },
  area_of_operation: {
    type : String
  },
  number_of_chainsaw_operator: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create a model
const Forestry_24 = mongoose.model('forestry_24', Forestry_24_Schema);

export default Forestry_24;
