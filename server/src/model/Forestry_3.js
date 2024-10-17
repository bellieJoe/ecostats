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

// Create a model
const Forestry_3 = mongoose.model('forest_3', Forestry_3_Schema);

export default Forestry_3;
