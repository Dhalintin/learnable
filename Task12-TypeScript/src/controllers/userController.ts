import mongoose from 'mongoose';
import express, { raw } from 'express';
import * as dotenv from 'dotenv';

const router = express.Router();

import jwt from 'jsonwebtoken'
import argon2 from 'argon2';

import { userSchemaValidation } from '../validation';

import { Request, Response } from 'express'

import userService from '../services/user.services'
import User from '../models/user.model'


class UserController {

    // Signing up
    async signUp(req: Request, res: Response){
        const email = req.body.email;
        const existingUser = await userService.getUser({ email });
        if(existingUser){
            return res.status(500).json({
                success: false,
                message: "This email is already in use"
            })
        }

        const hash = await argon2.hash(req.body.password, {
            type: argon2.argon2id,
            timeCost: 2,
            memoryCost: 2048,
          });

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            role: req.body.role || "guest"
        });

        const newUser = await userService.addUser(user)

        return res.status(200).json({
            success: true,
            message: 'You have signed up successfully',
            data: newUser
        })
    }
    
    // Loging in
    async login (req: Request, res: Response){
        const { error } = userSchemaValidation.validate(req.body);
        if(error){
            return res.status(401).json({
                message: error
            })
        }
        const email = req.body.email;
        const existingUser = await userService.getUser({ email });
        if(!existingUser){
            return res.status(409).json({
                message: "Authenticationd failed"
            })
        }
        
        const isVerified = await argon2.verify(existingUser.password, req.body.password);
        if(!isVerified){
            return res.status(401).json({
                success: false,
                message: "Authentications failed"
            })
        }

        const passkey = process.env.JWT_KEY;
        if(passkey){
            const token = jwt.sign({
                email: existingUser.email,
                userId: existingUser._id,
                role: existingUser.role
            }, passkey, 
            {
                expiresIn: "1h"
            })

            return res.status(200).json({
                success: true,
                message: "You are looged in",
                data: token
            })
        }
    }
    
    // Getting registered Users
    async getUser (req: Request, res: Response) {
        const filter = {}
        const users = await userService.getUsers(filter);
        return res.status(200).json({
            success: true,
            message: "Users",
            data: users
        })
    }
    
    // Deleting a user
    async deleteUser(req: Request, res: Response){
        const userId = req.params.id;
        const user = await userService.deleteUser(userId);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    }
}

export default new UserController