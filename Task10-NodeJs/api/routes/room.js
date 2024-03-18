const { json } = require('body-parser');
const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Room = require('../models/room');
const RoomType = require('../models/roomtype')


//Get all Room with or without a specific parameters
router.get('/', (req, res) => {
    const filter = {};

    if (req.query.search) {
        filter.$text = { $search: req.query.search };
    }
    if (req.query.roomType) {
        filter.room_type = req.query.roomType;
    }
    if (req.query.minPrice) {
        filter.price = { $gte: req.query.minPrice };
    }
    if (req.query.maxPrice) {
        filter.price = { ...filter.price, $lte: req.query.maxPrice };
        if (!req.query.minPrice) {
        filter.price = { $lte: req.query.maxPrice, $gte: 0 };
        }
    }

    try{
        Room.find(filter)
        .exec()
        .then(async (docs) => {
            const roomsWithTypes = await Promise.all(
                docs.map(async (doc) => {
                    const roomType = await RoomType.findById(doc.room_type);
                    const data = {
                            _id: doc._id,
                            name: doc.name,
                            room_type: roomType,
                            price: doc.price,
                            request: {
                              type: 'GET',
                              url: 'http://localhost:3000/room/' + doc._id
                            }
                          };
                    console.log(data)
                    return data;
                    })
                  );
            res.status(200).json({ rooms: roomsWithTypes });
        })
        .catch(err => {
            res.status(500).json({message: err});
        })

    }catch(error){
        res.status(500).json({message: error});
    };

    
    
});


//Create a new Room 
router.post('/', (req, res) => {
    const rmtype = req.body.roomtype
    RoomType.findById(rmtype)
        .exec()
        .then(roomtype => {
            const room = new Room({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                room_type: roomtype._id,
                price: req.body.price
            })
            room
                .save()
                .then(result => {
                    console.log(result);
                    res.status(200).json(result);
                })
                .catch(error => {errorMessage : error})
        }).catch(err => {
            res.status(500).json({
                message: err
            });
        });
});


//Get a specific room by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const room =  await Room.findById(id).populate('room_type');
        if(!room){
            res.status(500).json({ message: "There are no rooms matching this ID" });
        }

        const roomDetails = {
            _id: room.id,
            name: room.name,
            room_type: room.room_type.name,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/room/' + room._id
            }
        };
        res.status(200).json(roomDetails);
        
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
});

//Update a specific Room
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    Room.updateOne({_id: id}, {
        $set: { name: req.body.name, room_type: req.body.type}
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


//Delete a specific room
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Room.deleteOne({_id: id})
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