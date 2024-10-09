import { Schema, model } from "mongoose";

const UserRoleSchema = new Schema({ 
    roleId : {
        type : Schema.Types.ObjectId,
        ref : 'roles',
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "users",
        required : true
    }
});

const UserRoleModel = model("userRoles", UserRoleSchema);
export default UserRoleModel;