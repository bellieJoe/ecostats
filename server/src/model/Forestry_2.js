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
  municipality: {
    type: String,
    required: true
  },
  total_land_cover_area: {
    type: Number,
    required: true
  },
  forest_cover: {
    total_forest_cover: {
      type: Number,
      required: true
    },
    closed_forest: {
      type: Number,
      required: true
    },
    open_forest: {
      type: Number,
      required: true
    },
    mangrove_forest: {
      type: Number,
      required: true
    }
  },
  other_land_cover: {
    total_other_land_cover: {
      type: Number,
      required: true
    },
    brush_shrubs: {
      type: Number,
      required: true
    },
    grassland: {
      type: Number,
      required: true
    },
    annual_crop: {
      type: Number,
      required: true
    },
    perennial_crop: {
      type: Number,
      required: true
    },
    open_barren_land: {
      type: Number,
      required: true
    },
    built_up_area: {
      type: Number,
      required: true
    },
    fishpond: {
      type: Number,
      required: true
    },
    marshland_swamp: {
      type: Number,
      required: true
    },
    inland_water: {
      type: Number,
      required: true
    }
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

Forestry_2_Schema.index(
  { calendar_year: 1, province: 1, municipality: 1 },
  { unique: true }
);

// Create a model
const Forestry_2 = mongoose.model('forestry_2', Forestry_2_Schema);

export default Forestry_2;
