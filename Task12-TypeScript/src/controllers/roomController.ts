import { Request, Response } from 'express'
import roomService from '../services/room.services';
import Room from '../models/room.model'
// import roomType from '../routes/roomtype.route';
import mongoose from 'mongoose';


class RoomController {

  // Getting all rooms
  async getAllRooms(req: Request, res: Response){
    const allRooms = await roomService.getRooms({}) 
    return res.status(200).json({
      data: allRooms
    });
  }

  // Adding new room
  async addNewRoom(req: Request, res: Response){
    const body = req.body
    const existingRoom = await roomService.getRooms({title: body.name.toLowerCase()});
    const filter = {};

    if(existingRoom.length > 0){
      
      return res.status(401).json({
        success: false,
        message: 'This name is already in use for a room'
      });

    }

    const room = new Room({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      room_type: req.body.roomtype || '65f485df2c3e9dea3442e6f5',
      price: req.body.price || 100
    });

    const newRoom = await roomService.addRoom(room)

    return res.status(200).json({
      success: true,
      message: 'New Room added successfully',
      data: newRoom
    })
  }

  // Getting a single room
  async getRoom(req: Request, res: Response){
    const roomId = req.params.id;
    const roomToGet = await  roomService.getRoom({_id: roomId});

    if(!roomToGet){
      return res.status(500).json({
        success: false,
        message: 'Room not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Room found',
      data: roomToGet
    })
  }

  // Updating a room
  async editRoom(req: Request, res: Response){
    const roomId = req.params.id;
    const updateData = req.body

    const roomToEdit = await  roomService.getRoom({_id: roomId});

    if(!roomToEdit){
      return res.status(500).json({
        success: false,
        message: 'Room not found'
      })
    }

    if(updateData.name){
      const existingRoomName  = await roomService.getRoom({name: updateData.name.toLowerCase()});
      if(existingRoomName){
        return res.status(400).json({
          success: false,
          message: 'This name has already been used for another room'
        });
      }

      const updatedBook = await roomService.updateRoom(roomId, updateData)

      return res.status(200).json({
        success: true,
        message: 'Room updated successfully',
        data: updatedBook
      })

    }

  }

  // Deleting a Room
  async deleteRoom(req: Request, res: Response){
    const roomId = req.params.id;
    const roomToDelete = await  roomService.getRoom({_id: roomId});

    if(!roomToDelete){
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      })
    }

    await roomService.deleteRoom(roomId)

      return res.status(200).json({
        success: true,
        message: 'Room deleted successfully',
      })

    }

}

export default new RoomController;