import { Schema, model } from "mongoose";
const ProgramSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String
    },  
    deletedAt : {
        type : Date,
        default: null
    },
    programHead : {
        type : Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    management : {
        type : String,
        enum : ["land", "biodiversity", "forestry"],
        required : true
    }
},
{
    timestamps  : true
});

// Create a compound index to enforce unique name where deletedAt is null
ProgramSchema.index({ name: 1, deletedAt: 1 }, { unique: true, partialFilterExpression: { deletedAt: null } });


const ProgramModel = model("programs", ProgramSchema);
export default ProgramModel;