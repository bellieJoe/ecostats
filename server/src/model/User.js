import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type : String,
        required : [true, "Name is required"]
    },
    email: { 
        type: String, 
        required : true,
        unique: true 
    },
    passwordHash: { 
        type: String, 
        required: true 
    },
    isActive: { 
        type: Boolean, 
        required: true,
    },
    refreshToken : {
        type: String
    },
    role : {
        type : String,
        enum : ["admin", "planning officer", "chief", "focal"]
    }
}, {
    timestamps : true,
})



const UserModel = model("users", UserSchema);
export default UserModel;