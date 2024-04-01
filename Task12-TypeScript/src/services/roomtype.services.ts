import { FilterQuery, UpdateQuery } from 'mongoose';
import RoomTypeModel from '../models/roomtype.model';
import { RoomType } from '../interfaces/roomtype.interface'

class RoomTypeService{

    // Add Room
    async addRoomType(data: RoomType){
        return await RoomTypeModel.create(data)
    }

    // Update a RoomType 
    async updateRoomType(id: string, updateData: UpdateQuery<RoomType>){
        return await RoomTypeModel.findByIdAndUpdate(id, updateData, {
            new: true
        })
    }

    // Delete a RoomType 
    async deleteRoomType(id: string){
        return await RoomTypeModel.findByIdAndDelete(id)
    }

    // Get a single RoomType
    async getRoomType(filter: FilterQuery<RoomType>){
        return await RoomTypeModel.findOne(filter)
    }

    // Get all RoomTypes 
    async getRoomTypes (filter: FilterQuery<RoomType>){
        return await RoomTypeModel.find(filter)   
    }
}

export default new RoomTypeService()