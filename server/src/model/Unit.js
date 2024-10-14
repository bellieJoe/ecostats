import { Schema, model } from "mongoose";
import UnitHeadModel from "./UnitHead.js";

const UnitSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    programId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "programs"
    },
    description : {
        type : String
    },  
    deletedAt : {
        type : Date,
        default : null
    }
},
{
    timestamps  : true
});



const UnitModel = model("units", UnitSchema);
export default UnitModel;