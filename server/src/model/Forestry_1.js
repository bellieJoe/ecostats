import mongoose from 'mongoose'; // Using ES6 import syntax

const Forestry_1_Schema = new mongoose.Schema({
  calendar_year: {
    type: Number,
    required : true
  },
  province: {
    type: String,
    required : true
  },
  municipality: {
    type: String,
    required : true
  },
  total_land_area: {
    type: Number,
    required : true
  },
  certified_a_n_d: {
    type: Number,
    required : true
  },
  forestland: {
    total_forestland: {
      type: Number,
      required : true
    },
    unclassified_forestland_ha: {
      type: Number,
      required : true
    },
    classified_forestland: {
      total_classified_forestland: {
        type: Number,
        required : true
      },
      established_forest_reserves: {
        type: Number,
        required : true
      },
      established_timberland: {
        type: Number,
        required : true
      },
      national_parks_and_grbs_wa: {
        type: Number,
        required : true
      },
      military_and_naval_reservations: {
        type: Number,
        required : true
      },
      civil_registration: {
        type: Number,
        required : true
      },
      fishpond: {
        type: Number,
        required : true
      }
    }
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

Forestry_1_Schema.index(
  { calendar_year: 1, province: 1, municipality: 1 },
  { unique: true }
);

// Create a model
const Forestry_1 = mongoose.model('forestry_1', Forestry_1_Schema);

export default Forestry_1;
