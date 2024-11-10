import mongoose, { Schema } from "mongoose";

const FieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    identifier: {
        type: String,
        required: function() {
            return !this.is_nested;
        },
        validate: {
            validator: function(value) {
                // Make sure `identifier` is not null or empty
                if (this.is_nested === false) {
                    return value !== null && value.trim() !== '';
                }
                return true; // No validation if nested
            },
            message: 'Identifier cannot be null or empty if not nested'
        }
    },
    input_type: {
        type: String,
        enum: ['text', 'number', 'date', 'enum'], 
        required : function() {
            return !this.is_nested;
        },
    },
    is_nested : {
        type : Boolean,
        default : false,
        required : true
    },
    values : {
        type : [String],
        required : function() {
            return this.input_type === 'enum';
        }
    },
    editable : {
        type : Boolean,
        default : false,
        required : true
    },
    default : {
        type : String,
        required : function() {
            return !this.is_nested && !this.editable;
        },
    },
    children : {
        type : [this],
        required : function() {
            return this.is_nested;
        },
        default : []
    }
}, { timestamps: true });

FieldSchema.index({ identifier: 1, is_nested: 1 }, { unique: true, partialFilterExpression: { is_nested: false } });


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



