import mongoose from 'mongoose';

const Forestry_3_Schema = new mongoose.Schema({
  calendar_year: {
    type: Number,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  municipality: {
    type: String,
    required: true
  },
  total_area: {
    type: Number,
    required: true
  },
  production_forest: {
    type: Number,
    required: true
  },
  protection_forest: {
    type: Number,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

Forestry_3_Schema.index(
  { calendar_year: 1, province: 1, municipality: 1 },
  { unique: true }
);


// Create a model
const Forestry_3 = mongoose.model('forestry_3', Forestry_3_Schema);

export default Forestry_3;
