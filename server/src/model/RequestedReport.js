import mongoose, { Schema } from 'mongoose'; // Using ES6 import syntax

const RequestedReportSchema = new mongoose.Schema({
  title: {
    type: String,
    required : true
  },
  description: {
    type: String,
    default : null
  },
  filters: {
    type: Object,
    required : true
  },
  fields: {
    type: [Object],
    required : true
  },
  form_name : {
    type : String,
    required : true
  },
  unitId : {
    type : Schema.Types.ObjectId,
    required : true,
    ref: "units"
  },
  requested_by: {
    type: Schema.Types.ObjectId,
    ref : "users",
    required : true
  },
  reviewed_at : {
    type : Date,
    default : null
  },
  approved_at : {
    type : Date,
    default : null
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create a model
const RequestedReportModel = mongoose.model('requested_reports', RequestedReportSchema);

export default RequestedReportModel;
