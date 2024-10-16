import mongoose from "mongoose";

const Land_6_Schema = new mongoose.Schema({
    name_of_patentee: {
        type: String,
        required: true
    },
    calendar_year: {
        type: Number,
        required: true
    },
    area_in_ha: {
        type: Number,
        required: true
    },
    location: {
        barangay: {
            type: String,
            required: true
        },
        municipality: {
            type: String,
            required: true
        }
    },
    date_transmitted_to_rod: {
        type: Date,
        required: true
    },
    government_sites_housing_project_endorsement: {
        school_site: {
            type: Boolean,
            default: false
        },
        lgu_government_site: {
            type: Boolean,
            default: false
        }
    }
});

const Land_6 = mongoose.model('land_6', Land_6_Schema);

export default Land_6;
