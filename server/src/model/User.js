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
    }
}, {
    timestamps : true,
})



const UserModel = model("users", UserSchema);
export default UserModel;