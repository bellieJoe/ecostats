import { Schema, model } from "mongoose";

const Land_2_Schema = new Schema({
    calendar_year : {
        type : Number,
        required : true,
    },
    province : {
        type : String,
        required : true,
    },
    municipality : {
        type : String,
        required : true,
    },
    no_of_lots : {
        type : String,
        required : true,
    },
    total_land_area : {
        type : String,
        required : true,
    },
    sale : {
        type : Number,
        required : true,
    },
    lease : {
        type : Number,
        required : true,
    },
},
{
    timestamps  : true
});

const Land_2 = model("land_2", Land_2_Schema);
export default Land_2;