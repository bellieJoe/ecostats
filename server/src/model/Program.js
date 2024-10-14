import { Schema, model } from "mongoose";
import ProgramHeadModel from "./ProgramHead.js";
import UnitModel from "./Unit.js";

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
    }
},
{
    timestamps  : true
});

// Create a compound index to enforce unique name where deletedAt is null
ProgramSchema.index({ name: 1, deletedAt: 1 }, { unique: true, partialFilterExpression: { deletedAt: null } });

ProgramSchema.post("findOneAndUpdate", async function(doc) {
    await ProgramHeadModel.updateMany({
        programId : doc._id
    }, {
        deletedAt : Date.now()
    });

    await UnitModel.updateMany({
        programId: doc._id
    }, {
        deletedAt : Date.now()
    })
});

const ProgramModel = model("programs", ProgramSchema);
export default ProgramModel;