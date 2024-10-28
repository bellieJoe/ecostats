import mongoose from 'mongoose';

const Forestry_4_Schema = new mongoose.Schema({
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
  watershed_reservation_name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  area_ha: {
    type: Number,
    required: true
  },
  presidential_proclamation_no: {
    type: String,
    required: true
  },
  proclamation_date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

Forestry_4_Schema.index(
  { calendar_year: 1, province: 1, municipality: 1, watershed_reservation_name : 1 },
  { unique: true }
);

// Create a model
const Forestry_4 = mongoose.model('forestry_4', Forestry_4_Schema);

export default Forestry_4;
