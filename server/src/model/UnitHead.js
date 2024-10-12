import { Mongoose, Schema, model } from "mongoose";

const UnitHeadSchema = new Schema({
    unit : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "units"
    },
    user : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "users"
    },
    deletedAt : {
        type : Date
    }
});

const UnitHeadModel = model("unitHeads", UnitHeadSchema);
export default UnitHeadModel;