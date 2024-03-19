const { json } = require('body-parser');
const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Room = require('../models/room');
const RoomType = require('../models/roomtype')
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('roomdata.json', 'utf8'));
const roomTypeData = JSON.parse(fs.readFileSync('roomtypedata.json', 'utf8'));


//Get all Room with or without a specific parameters
router.get('/', (req, res) => {
    const filter = {};

    if (req.query.search) {
        filter.name = new RegExp(req.query.search, 'i');
    }
    if (req.query.roomType) {
        filter.room_type = req.query.roomType;
    }
    if (req.query.minPrice) {
        filter.price = { $gte: req.query.minPrice, $lte: Number.POSITIVE_INFINITY};
    }
    if (req.query.maxPrice) {
        filter.price = { ...filter.price, $lte: req.query.maxPrice };
        if (!req.query.minPrice) {
          filter.price = { $lte: req.query.maxPrice, $gte: 0 };
        }
      }

    try{
        const filteredRooms = data.filter(room => {
            let isValid = true;
            if (filter.name) isValid = isValid && filter.name.match(room.name);
            if (filter.room_type) {
                const matchingRoomType = roomTypeData.find(type => type._id == room.room_type);
                isValid = isValid && !!matchingRoomType;
              }
            if (filter.price) isValid = isValid && room.price >= filter.price.$gte && room.price <= filter.price.$lte;
            return isValid;
          });

          res.status(200).json({ rooms: filteredRooms});

    }catch(error){
        res.status(500).json({message: error});
    };
});


//Create a new Room 
router.post('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('roomdata.json', 'utf8'));
    const roomtype = roomTypeData.find(type => type._id === req.body.roomtype)
    if(!roomtype){
        return res.status(500).json({message: "Room type does not exist"});
    }
    const newRoomId = `RoomId${data.length + 1}`;
    const newRoom = {
        _id: newRoomId,
        name: req.body.name,
        room_type: roomtype.name,
        price: req.body.price
    };

    data.push(newRoom);

    fs.writeFileSync('roomdata.json', JSON.stringify(data, null, 2));

    res.status(200).json(newRoom);
});


//Get a specific room by ID
router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.promises.readFile('roomdata.json', 'utf8'));

    const room = data.find(room => room._id === req.params.id);

    if (!room) {
      return res.status(404).json({ message: "There are no rooms matching this ID" });
    }

    const roomDetails = {
      _id: room._id,
      name: room.name,
      room_type: room.room_type,
      request: {
        type: 'GET',
        url: `http://localhost:3000/room/${room._id}`
      }
    };

    res.status(200).json(roomDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving room data" });
  }
});

//Update a specific Room
router.patch('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.promises.readFile('roomdata.json', 'utf8'));

    const roomIndex = data.findIndex(room => room._id === req.params.id);

    if (roomIndex === -1) {
      return res.status(404).json({ message: "There are no rooms matching this ID" });
    }

    data[roomIndex] = {
      ...data[roomIndex],
      name: req.body.name,
      room_type: req.body.type
    };

    await fs.promises.writeFile('roomdata.json', JSON.stringify(data, null, 2));

    res.status(200).json(data[roomIndex]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating room data" });
  }
});


//Delete a specific room
router.delete('/:id', async (req, res) => {
    try {
        const data = JSON.parse(await fs.promises.readFile('roomdata.json', 'utf8'));
    
        const roomIndex = data.findIndex(room => room._id === req.params.id);
    
        if (roomIndex === -1) {
          return res.status(404).json({ message: "There are no rooms matching this ID" });
        }
    
        data.splice(roomIndex, 1);
    
        await fs.promises.writeFile('roomdata.json', JSON.stringify(data, null, 2));
    
        res.status(200).json({ message: "Room deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting room data" });
      }
});

module.exports = router;