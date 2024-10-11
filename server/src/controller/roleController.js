import UserRoleModel from "../model/UserRole.js";
import RoleModel from "../model/Role.js";


export const getRolesByUserId = async (req, res) => {
    try {
        const userId = req.params.id;

        const userRoles = await UserRoleModel.find({
            user: userId,
            isDeleted: false
        })
        .populate("role");

        const roles = userRoles.map(userRole => {
            return userRole.role;
        })
        
        res.json(roles);

    } catch (error) {
        console.log(error)
        res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        );
    }
}

export const getRoles = async (req, res) => {
    try {
        const roles = await RoleModel.find({});
        
        res.json(roles);

    } catch (error) {
        console.log(error)
        res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        );
    }
}