import { Mongoose, Schema, model } from "mongoose";

const ProgramHeadSchema = new Schema({
    programId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref: "programs"
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

const ProgramHeadModel = model("programHeads", ProgramHeadSchema);
export default ProgramHeadModel;