import { Mongoose, Schema, model } from "mongoose";

const ProgramHeadSchema = new Schema({
    program : {
        type : Schema.Types.ObjectId,
        required : true,
        ref: "programs"
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

const ProgramHeadModel = model("programHeads", ProgramHeadSchema);
export default ProgramHeadModel;