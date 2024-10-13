import { Mongoose, Schema, model } from "mongoose";

const UnitHeadSchema = new Schema({
    unitId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "units"
    },
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "users"
    },
    deletedAt : {
        type : Date,
        default : null
    }
});

const UnitHeadModel = model("unitHeads", UnitHeadSchema);
export default UnitHeadModel;