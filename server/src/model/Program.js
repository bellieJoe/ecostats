import { Schema, model } from "mongoose";

const ProgramSchema = new Schema({
    name : {
        type : String,
        unique : true,
        required : true,
    },
    description : {
        type : String
    },  
    deletedAt : {
        type : Date,
        default: null
    }
},
{
    timestamps  : true
});

const ProgramModel = model("programs", ProgramSchema);
export default ProgramModel;