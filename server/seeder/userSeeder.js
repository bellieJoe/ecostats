import UserModel from "../model/User.js"
import bcrypt, { genSalt } from "bcrypt"
import UserRoleModel from "../model/UserRole.js";
import RoleModel from "../model/Role.js";

export default async function SeedUsers(){
    await UserModel.deleteMany();
    await UserRoleModel.deleteMany();

    const roles = await RoleModel.find();
    

    // setup admin
    const admin = new UserModel({
        name: "Admin User",
        email: "admin@gmail.com",
        passwordHash: await bcrypt.hash("password", 10),
        isActive: true
    })
    await admin.save();
    await new UserRoleModel({
        userId: admin._id,
        roleId: roles.filter(role => role.value == "admin")[0]._id
    })
    .save();
    console.log("User seeded successfuly")
}