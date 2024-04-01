import { Request, Response } from 'express'
import roomTypeService from '../services/roomtype.services';
import RoomType from '../models/roomtype.model'
import mongoose from 'mongoose';


class RoomTypeController {

  // Getting all roomtypes
  async getAllRoomTypes(req: Request, res: Response){
    const allRoomTypes = await roomTypeService.getRoomTypes({}) 
    return res.status(200).json({
      data: allRoomTypes
    });
  }

  // Adding new roomtype
  async addNewRoomType(req: Request, res: Response){
    const body = req.body
    const existingRoomType = await roomTypeService.getRoomTypes({name: body.name.toLowerCase()});
    const filter = {};

    if(existingRoomType.length > 0){
      return res.status(401).json({
        success: false,
        message: "This name is already in use for a room"
      });

    }
    
    const roomType = new RoomType({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
    });

    const newRoomType = await roomTypeService.addRoomType(roomType)

    return res.status(200).json({
      success: true,
      message: 'New Room added successfully',
      data: newRoomType
    })

    }
    

  // Getting a single roomtype
  async getRoomType(req: Request, res: Response){
    const roomId = req.params.id;
    const roomTypeToGet = await  roomTypeService.getRoomType({_id: roomId});

    if(!roomTypeToGet){
      return res.status(500).json({
        success: false,
        message: 'Room not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Room found',
      data: roomTypeToGet
    })
  }

  // Updating a roomtype
  async editRoomType(req: Request, res: Response){
    const roomtypeId = req.params.id;
    const updateData = req.body

    const roomTypeToEdit = await  roomTypeService.getRoomType({_id: roomtypeId});

    if(!roomTypeToEdit){
      return res.status(500).json({
        success: false,
        message: 'Roomtype not found'
      })
    }

    if(updateData.name){
      const existingRoomTypeName  = await roomTypeService.getRoomType({name: updateData.name.toLowerCase()});
      if(existingRoomTypeName){
        return res.status(400).json({
          success: false,
          message: 'This name has already been used for another room'
        });
      }

      const updatedRoom = await roomTypeService.updateRoomType(roomtypeId, updateData)

      return res.status(200).json({
        success: true,
        message: 'Room updated successfully',
        data: updatedRoom
      })

    }

  }

  // Deleting a Roomtype
  async deleteRoomType(req: Request, res: Response){
    const roomTypeId = req.params.id;
    const roomTypeToDelete = await  roomTypeService.getRoomType({_id: roomTypeId});

    if(!roomTypeToDelete){
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      })
    }

    await roomTypeService.deleteRoomType(roomTypeId)

      return res.status(200).json({
        success: true,
        message: 'Roomtype deleted successfully',
      })

    }

}

export default new RoomTypeController;