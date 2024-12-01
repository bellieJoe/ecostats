import mongoose, { Schema } from "mongoose";

const ChartConfigSchema = new mongoose.Schema({
    report_config_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title : {
        type : String,
        required : true
    },
    type : {
        required : true,
        type : String,
        enum : ["Vertical Bar Chart", "Horizontal Bar Chart", "Pie Chart", "Line Chart", "Tabular Presentation"]
    },
    chart_config: {
        type: Object,
        required: true
    },
    include_other_years : {
        type : Boolean,
        default : false
    }
}, { 
    timestamps: true,
    virtuals : true,
    toJSON : { virtuals : true }
});


const ChartConfigModel = mongoose.model('chart_configs', ChartConfigSchema);

export default ChartConfigModel;



