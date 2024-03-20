const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const RoomType = require('../models/roomtype')

//Get all RoomTypes
router.get('/', (req, res) => {
    RoomType.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({message: err});
        })
});

//Create new Room Types
router.post('/', (req, res) => {
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
});

// Get a specific roomtype by ID
router.get('/:id', (req, res) => {
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
});

//Update a specific roomtype
router.patch('/:id', (req, res) => {
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
});

// Delete a specific room type
router.delete('/:id', (req, res) => {
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
});


module.exports = router;