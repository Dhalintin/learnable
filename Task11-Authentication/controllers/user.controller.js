const mongoose = require('mongoose');
const express = require('express');
const User = require('../api/models/user.model');
const router = express.Router();
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const Joi = require('joi');
const { userSchemaValidation } = require('../validation');

const signUp = async (req, res) => {
    const email = req.body.email;
    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(409).json({
            message: "This email is already in use"
        })
    }else{
        const hash = await argon2.hash(req.body.password, {
            type: argon2.argon2id,
            saltLength: 16,
            timeCost: 2,
            memoryCost: 2048,
        });
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            role: req.body.role || "guest"
        });

        user.save();
        res.status(200).json({
            message: 'Signed up sucessfully',
            data: user
        })
    }
}

const login = async (req, res) => {
    const { error } = userSchemaValidation.validate(req.body);
    if(error){
        return res.status(401).json({
            message: error
        })
    }
    const email = req.body.email;
    const user = await User.findOne({ email });
    if(!user){
        return res.status(409).json({
            message: "Authenticationd failed"
        })
    }else{
        const isVerified = await argon2.verify(user.password, req.body.password);
        if(!isVerified){
            return res.status(401).json({
                message: "Authentications failed"
            })
        }else{
             const token = jwt.sign({
                email: user.email,
                userId: user._id,
                role: user.role
             }, process.env.JWT_KEY,
             {
                expiresIn: "1h",
             });

             return res.status(200).json({
                message: "Auth Successfull",
                token: token
             })
        }
    }

}

const getUser = async (req, res) => {
    const filter = {}
    await User.find(filter)
    .exec()
    .then(async (docs) => {
        res.status(200).json({
            message: docs
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
}

const deleteUser = (req, res) => {
    const userId = req.params.id;
    User.findOneAndDelete(userId)
        .exec()
        .then(data => {
            res.status(200).json({
                message: data
            })
        })
        .catch(err => {
            res.status(401).json({
                error: err
            })
        });
}

module.exports = { signUp, login, getUser, deleteUser }