import UserModel from "../model/User.js"
import bcrypt, { genSalt } from "bcrypt"
import UserRoleModel from "../model/UserRole.js";
import RoleModel from "../model/Role.js";
import dotenv from "dotenv"

dotenv.config()

export default async function SeedUsers(){
    await UserRoleModel.deleteMany();
    await UserModel.deleteMany();

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
        user: admin,
        role: roles.filter(role => role.value == "admin")[0]
    })
    .save();
    console.log("User seeded successfuly")

    for(let i = 1; i<=23; i++){
        // setup admin
        const _admin = new UserModel({
            name: `Admin User ${i}`,
            email: `admin${i}@gmail.com`,
            passwordHash: await bcrypt.hash("password", 10),
            isActive: true
        })
        await _admin.save();
        await new UserRoleModel({
            user: _admin,
            role: roles.filter(role => role.value == "admin")[0]
        })
        .save();
        console.log("User seeded successfuly")
    }
}