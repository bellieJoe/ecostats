import mongoose from "mongoose";

const Biodiversity_10_Schema = new mongoose.Schema({
    calendar_year : {
        type : Number,
        required : true,
    },
    province: {
        type: String,
        required: true,
    },
    municipality: {
        type: String,
        required: true,
    },
    name_of_critical_habitat: {
        type: String,
        required: true,
    },
    legal_instrument: {
        type: String,
    },
    area: {
        type: Number,
        required: true,
    },
    threatened_species: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});


const Biodiversity_10 = mongoose.model('biodiversity_10', Biodiversity_10_Schema);

export default Biodiversity_10;
