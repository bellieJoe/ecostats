import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    value : {
        type : String,
        required : true,
        unique : true
    }
});

const RoleModel = model("roles", RoleSchema);
export default RoleModel;