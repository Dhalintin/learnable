const { json } = require('body-parser');
const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Room = require('../api/models/room.model')
const RoomType = require('../api/models/roomtype.model')
const checkAuth = require('../api/middleware/user.auth')
const Joi = require('joi');
const {  roomSchemaValidation } = require('../validation');

const getAllRoomTypes = (req, res) => {
    RoomType.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({message: err});
        })
}

const addNewRoomType = (req, res) => {
    const { error } = roomTypeSchemaValidation.validate(req.body);

    if(error){
        return res.status(401).json({
            message: error
        })
    }
    
    if(req.userData.role === "admin"){
        const roomType = new RoomType({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name
        });
    
        roomType
            .save()
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
    
        res.status(200).json({
            message: "Done",
            createdRoom: roomType
        })
    }else{
        return res.status(401).json({
            message: "You are not authorized to create room"
        })
    }
}

const getRoomType = (req, res) => {
    const id = req.params.id;
    RoomType.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json(doc);
            }else{
                res.status(404).json({message: 'Invalid Id'});
            }  
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        });
}

const editRoomType = (req, res) => {
    if(req.userData.role === "admin"){
        const id = req.params.id;
        RoomType.updateOne({_id: id}, {
            $set: { name: req.body.name, type: req.body.type}
        }).exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        })
    }else{
        return res.status(401).json({
            message: "You are not authorized to make this change"
        })
    }
}

const deleteRoomType = (req, res) => {
    if(req.userData.role === "admin"){
        const id = req.params.id;
        RoomType.deleteOne({_id: id})
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                })
            });
    }else{
        return res.status(401).json({
            message: "You are not authorized"
        })
    }
}

module.exports = { getAllRoomTypes, addNewRoomType, getRoomType, editRoomType, deleteRoomType  }