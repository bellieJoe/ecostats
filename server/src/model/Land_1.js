import { Schema, model } from "mongoose";

const Land_1_Schema = new Schema({
    calendar_year : {
        type : Number,
        required : true,
    },
    province : {
        type : String,
        required : true,
    },
    contested_area : {
        type : Number,
        required : true,
    },
    uncontested_area : {
        type : Number,
        required : true,
    },
},
{
    timestamps  : true
});

const Land_1 = model("land_1", Land_1_Schema);
export default Land_1;