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
            res.status(500).json({error: "User not found"});

        if(!user.isActive)
            res.status(401).json({error: "User is not yet active. Please contact your administrator to activate your account"});

        if(!await validatePassword(req.body.password, user.passwordHash))
            return res.status(401).json({error: "Unauthorized"});

        const accessToken = await generateJWTToken(user._id)
        user.refreshToken = await generateJWTRefreshToken(user._id)
        await user.save();

        res.status(200).json({
            accessToken: accessToken,
            refreshToken: user.refreshToken
        });
    } catch (error) {
        res.status(500).json(
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

       res.json(user);

    } catch (error) {
        await session.abortTransaction();
        res.status(500).json(
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
            res.status(400).json({errors: errors.array()})

        const refreshToken = req.body.refreshToken;

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Invalid refresh token' });

            // Generate new access token
            const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
            res.json({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        });
    } catch (error) {
        res.status(500).json(
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

        const skip = (page - 1) * limit;

        const total = await UserModel.countDocuments();

        const users = await UserModel.find()
                            .skip(skip)
                            .limit(limit)
                            .select("_id name email isActive createdAt ");

        res.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            users,
        })
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

export const test =  async  (req, res) => {
    try {
        const i = await RoleModel.findById("6708b427fadb06d0251a8066")
        res.json(i)
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