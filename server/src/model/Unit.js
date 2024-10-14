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


UnitSchema.pre("updateMany", async function(next) {
    // Use this.getFilter() to retrieve the filter used in the updateMany
    const filter = this.getFilter();
    if(filter.programId){
        const units = await UnitModel.find({
            programId : filter.programId
        })
        const unitIds = units.map(r => {
            return r._id
        })
        await UnitHeadModel.updateMany(
            { unitId: { $in: unitIds || [] } }, // Adjust as needed to match your logic
            { deletedAt: Date.now() }
        );
    }
    // filter._id
    next();
});

UnitSchema.post("findOneAndUpdate", async function(doc) {
    console.log(doc)
    await UnitHeadModel.updateMany({
        unitId : doc._id,
    }, {
        deletedAt : Date.now()
    })
});

const UnitModel = model("units", UnitSchema);
export default UnitModel;