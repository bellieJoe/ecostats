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
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
});

const UserRoleModel = model("userRoles", UserRoleSchema);
export default UserRoleModel;