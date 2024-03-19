const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const RoomType = require('../models/roomtype');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('roomtypedata.json', 'utf8'));
//Get all RoomTypes
router.get('/', (req, res) => {
    res.status(200).json({ rooms: data});
});

//Create new Room Types
router.post('/', (req, res) => {
    const newRoomTypeId = `roomtypeid00${data.length + 1}`;
    const newRoom = {
        _id: newRoomTypeId,
        name: req.body.name
    };

    data.push(newRoom);

    fs.writeFileSync('roomtypedata.json', JSON.stringify(data, null, 2));

    res.status(200).json(newRoom);
});

// Get a specific roomtype by ID
router.get('/:id', (req, res) => {
    const roomtype = data.find(room => room._id === req.params.id);
    if (!roomtype) {
      return res.status(404).json({ message: "There are no rooms matching this ID" });
    }

    const roomTypeDetails = {
      _id: roomtype._id,
      name: roomtype.name,
    };

    res.status(200).json(roomTypeDetails);
});

//Update a specific roomtype
router.patch('/:id', async (req, res) => {
    try {
        const data = JSON.parse(await fs.promises.readFile('roomtypedata.json', 'utf8'));
    
        const roomIndex = data.findIndex(roomtype => roomtype._id === req.params.id);
    
        if (roomIndex === -1) {
          return res.status(404).json({ message: "There are no rooms matching this ID" });
        }
    
        data[roomIndex] = {
          ...data[roomIndex],
          name: req.body.name,
        };
    
        await fs.promises.writeFile('roomtypedata.json', JSON.stringify(data, null, 2));
    
        res.status(200).json(data[roomIndex]);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating room data" });
      }
});

// Delete a specific room type
router.delete('/:id', async (req, res) => {
    try {
        const data = JSON.parse(await fs.promises.readFile('roomtypedata.json', 'utf8'));
    
        const roomIndex = data.findIndex(room => room._id === req.params.id);
    
        if (roomIndex === -1) {
          return res.status(404).json({ message: "There are no rooms matching this ID" });
        }
    
        data.splice(roomIndex, 1);
    
        await fs.promises.writeFile('roomtypedata.json', JSON.stringify(data, null, 2));
    
        res.status(200).json({ message: "Room deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting room data" });
      }
});


module.exports = router;