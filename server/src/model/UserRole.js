import { Schema, model } from "mongoose";

const UserRoleSchema = new Schema({ 
    role : {
        type : Schema.Types.ObjectId,
        ref : 'roles',
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "users",
        required : true
    }
});

const UserRoleModel = model("userRoles", UserRoleSchema);
export default UserRoleModel;