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
  requested_by: {
    type: Schema.Types.ObjectId,
    ref : "users",
    required : true
  },
  approved_by_unit_head: {
    type: Boolean,
    default : false
  },
  approved_by_division_head: {
    type: Boolean,
    default : false
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create a model
const RequestedReportModel = mongoose.model('requested_reports', RequestedReportSchema);

export default RequestedReportModel;
