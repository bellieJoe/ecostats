import UserModel from "../model/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { validationResult } from "express-validator";
import UserRoleModel from "../model/UserRole.js";
import RoleModel from "../model/Role.js";
import mongoose from "mongoose";

dotenv.config()

export const login = async (req, res)  => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(422).json({errors: errors.array()})
        
        const user  = await UserModel.findOne({ email: req.body.email});
        if(!user)
            return res.status(404).json({
                error: "Not Found",
                msg: "User Not found on the database"
            })

        if(!user.isActive)
            return res.status(401).json({
                error: "Unauthorized",
                msg: "User account is not active. Please contact your administrator to reactivate your account."
            })

        if(!await validatePassword(req.body.password, user.passwordHash))
            return res.status(401).json({error: "Unauthorized"});

        const accessToken = await generateJWTToken(user._id)
        user.refreshToken = await generateJWTRefreshToken(user._id)
        await user.save();

        return res.status(200).json({
            accessToken: accessToken,
            refreshToken: user.refreshToken
        });
    } catch (error) {
        return res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        );
    }
}

export const signup = async (req, res)  => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(422).json({errors: errors.array()})

        const { email, password, userRole, name } = req.body;
        
        const user = new UserModel({
            email,
            passwordHash : await bcrypt.hash(password, 10),
            name,
            isActive: true
        })
        const role = await RoleModel.findOne({value: userRole})
        await user.save();
        const _userRole = new UserRoleModel({
            user,
            role
        })
        await _userRole.save();

        await session.commitTransaction();

        return res.json(user);

    } catch (error) {
        await session.abortTransaction();
        return res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        );
    } finally {
        session.endSession();
    }
}

export const refreshToken = async (req, res)  => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()})

        const refreshToken = req.body.refreshToken;

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json(res.status(500).json({
                error: "Action Forbidden",
                msg: "The user session has already expired."
            }));

            // Generate new access token
            const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
            return res.json({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        });
    } catch (error) {
        return res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        );
    }
}

export const all = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const name = req.query.name; 

        const skip = (page - 1) * limit;

        const total = await UserModel.countDocuments();

        const q = name ? { name : { $regex : name, $options: "i" }} : {}

        const users = await UserModel.find(q)
                            .skip(skip)
                            .limit(limit)
                            .select("_id name email isActive createdAt ");

        return res.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            users,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        ); 
    }
}

export const test =  async  (req, res) => {
    try {
        const i = await RoleModel.findById("6708b427fadb06d0251a8066")
        res.json(i)
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        );
    }
}

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id){
            return res.status(500).json({
                error: "Invalid Parameter",
                msg: "Invalid request. Id is required"
            })
        }

        const user = await UserModel.findOne({_id:id}).select("_id name email isActive createdAt")

        if(!user){
            return res.json(404).send({
                error: "User not found"
            })
        }

        return res.json(user);

    } catch (error) {
        console.log(error)
        return res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        );
    }
}

export const activate = async (req, res)  => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                error: "Invalid Parameters",
                msg: "Invalid request. Id is required."
            })
        }

        const user = await UserModel.findById(id);
        if(!user) {
            return res.status(404).json({
                error: "Not found",
                msg: "User not found in the database."
            })
        }
        user.isActive = true;
        await user.save()

        return res.status(200).json();
        
    } catch (error) {
        return res.status(500).json(
            { 
                error: 'Server error.',
                details : error
            }   
        );
    }
}

export const deactivate = async (req, res)  => {
    try {
        const id = req.params.id;
        const accessToken = req.cookies.accessToken;

        if(!id ){
            return res.status(401).json({
                error: "Invalid Parameter",
                msg: "Invalid Request. The id must be present in the request"
            })
        }
        if(!accessToken ){
            return res.status(401).json({
                error: "Invalid Parameter",
                msg: "Invalid Request. The accessToken must be present in the request"
            })
        }

        const authId = getUserIdFromToken(accessToken)
        if(id == authId){
            return res.status(500).json({
                error: "Action Forbidden",
                msg: "You cannot deactivate your own account"
            })
        }

        const user = await UserModel.findById(id);
        if(!user) {
            return res.status(404).json({
                error: "Not found",
                msg: "User not found in the database."
            })
        }
        user.isActive = false;
        await user.save();

        return res.status(200).json();

    } catch (error) {
        return res.status(500).json(
            { 
                error: 'Server error.',
                details : error,
                msg: "Unexpected Error occured"
            }   
        );
    }
}

export const update = async (req, res)  => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(422).json({errors: errors.array()})
        
        const id = req.params.id;
        const name = req.body.name;
        const email = req.body.email;

        const user = await UserModel.findById(id)
        user.email = email;
        user.name = name;
        await user.save()

        return res.json(user);
        
    } catch (error) {
        return res.status(500).json(
            { 
                error: 'Server error.',
                details : error,
                msg: "Unexpected Error occured"
            }   
        );
    }
}

// helpers
async function validatePassword(password, passwordHash ){
    return bcrypt.compare(password, passwordHash);
}

async function generateJWTToken(userId){
    return jwt.sign({
            id: userId
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
}

async function generateJWTRefreshToken(userId){
    return jwt.sign({
            id: userId
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    )
}

export function getUserIdFromToken(token){
    const decoded = jwt.decode(token)
    return decoded.id;
}