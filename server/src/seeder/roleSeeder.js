import RoleModel from "../model/Role.js";


export default async function SeedRoles(){
    await RoleModel.deleteMany();

    await RoleModel.insertMany([
        {
            name : "System Administrator",
            value : "admin"
        },
        {
            name : "PENRO",
            value : "penro"
        },
        {
            name : "Division Head",
            value : "division head"
        },
        {
            name : "Unit Head",
            value : "unit head"
        },
        {
            name : "Land Inspection Manager",
            value : "LIP"
        },
        {
            name : "PA Caretaker",
            value : "pa caretaker"
        },
        {
            name : "Ordinary",
            value : "ordinary"
        }
    ]);
    console.log("Roles seeded successfuly")
}