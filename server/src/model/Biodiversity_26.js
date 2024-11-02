import mongoose from "mongoose";

const Biodiversity_26_Schema = new mongoose.Schema({
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
    date_of_confiscation: {
        type : Date ,
        required : true
    },
    status : {
        type : String,
        required : true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});



const Biodiversity_26 = mongoose.model('biodiversity_26', Biodiversity_26_Schema);

export default Biodiversity_26;
