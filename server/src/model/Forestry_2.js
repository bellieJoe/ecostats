import mongoose from 'mongoose';

const Forestry_2_Schema = new mongoose.Schema({
  calendar_year: {
    type: Number,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  total_land_cover_area: {
    type: Number,
    required: true
  },
  forest_cover: {
    total_forest_cover: {
      type: Number
    },
    closed_forest: {
      type: Number
    },
    open_forest: {
      type: Number
    },
    mangrove_forest: {
      type: Number
    }
  },
  other_land_cover: {
    total_other_land_cover: {
      type: Number
    },
    brush_shrubs: {
      type: Number
    },
    grassland: {
      type: Number
    },
    annual_crop: {
      type: Number
    },
    perennial_crop: {
      type: Number
    },
    open_barren_land: {
      type: Number
    },
    built_up_area: {
      type: Number
    },
    fishpond: {
      type: Number
    },
    marshland_swamp: {
      type: Number
    },
    inland_water: {
      type: Number
    }
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create a model
const Forestry_2 = mongoose.model('forestry_2', Forestry_2_Schema);

export default Forestry_2;
