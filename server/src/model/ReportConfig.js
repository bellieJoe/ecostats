import mongoose, { Schema } from "mongoose";

const FieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    identifier: {
        type: String,
        required: true,
        unique: true
    },
    inputType: {
        type: String,
        enum: ['text', 'number', 'date', 'enum'], 
        required: true
    },
    values : {
        type : [String],
        required : function() {
            return this.inputType === 'enum';
        }
    },
    children : {
        type : [this],
        default : []
    }
}, { timestamps: true });


const ReportConfigSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true
    },
    sector : {
        type : Schema.Types.ObjectId,
        ref : "sectors",
        required : true
    },
    name: {
        type: String,
        required: true
    },
    fields: {
        type: [FieldSchema], 
        required: true
    }
}, { timestamps: true });

ReportConfigSchema.index(
    { identifier : 1, sector : 1 },   
    { unique: true }
);

const ReportConfigModel = mongoose.model('report_configs', ReportConfigSchema);

export default ReportConfigModel;



