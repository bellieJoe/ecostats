import RoleModel from "../model/Role.js";


export default async function SeedRoles(){
    await RoleModel.deleteMany();

    await RoleModel.insertMany([
        {
            name : "System Administrator",
            value : "admin"
        },
        {
            name : "Supervisor",
            value : "supervisor"
        },
        {
            name : "Land Focal",
            value : "land focal"
        },
        {
            name : "Bio-Wildlife Focal",
            value : "bio-wildlife focal"
        },
        {
            name : "Forestry Focal",
            value : "forestry focal"
        }
    ]);
    console.log("Roles seeded successfuly")
}