import mongoose from 'mongoose'; // Using ES6 import syntax

const Forestry_1_Schema = new mongoose.Schema({
  calendar_year: {
    type: Number
  },
  province: {
    type: String
  },
  total_land_area: {
    type: Number
  },
  certified_a_n_d: {
    type: Number
  },
  forestland: {
    total_forestland: {
      type: Number
    },
    unclassified_forestland_ha: {
      type: Number
    },
    classified_forestland: {
      total_classified_forestland: {
        type: Number
      },
      established_forest_reserves: {
        type: Number
      },
      established_timberland: {
        type: Number
      },
      national_parks_and_grbs_wa: {
        type: Number
      },
      military_and_naval_reservations: {
        type: Number
      },
      civil_registration: {
        type: Number
      },
      fishpond: {
        type: Number
      }
    }
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create a model
const Forestry_1 = mongoose.model('forestry_1', Forestry_1_Schema);

export default Forestry_1;
