import mongoose from "mongoose";

const Biodiversity_27_Schema = new mongoose.Schema({
    calendar_year : {
        type : Number,
        required : true,
    },
    // province: {
    //     type: String,
    //     required: true,
    // },
    // municipality: {
    //     type: String,
    //     required: true,
    // },
    species : {
        common_name : {
            type : String,
            required  : true
        },
        scientific_name : {
            type : String,
            required : true
        }
    },
    quantity : {
        type : Number,
        required : true
    },
    physical_condition : {
        type : String
    },
    action_taken : {
        type : String,
        required : true
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Biodiversity_27_Schema.index(
//     { common_name: 1, scientific_name: 1 },
//     { unique: true }
// );

const Biodiversity_27 = mongoose.model('biodiversity_27', Biodiversity_27_Schema);

export default Biodiversity_27;
