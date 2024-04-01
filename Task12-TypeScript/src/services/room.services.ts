import { FilterQuery, UpdateQuery } from 'mongoose';
import RoomModel from '../models/room.model';
import { Room } from '../interfaces/room.interface'

class RoomService{

    // Add Room
    async addRoom(data: Room){
        return await RoomModel.create(data)
    }

    // Update a Room 
    async updateRoom(id: string, updateData: UpdateQuery<Room>){
        return await RoomModel.findByIdAndUpdate(id, updateData, {
            new: true
        })
    }

    // Delete a Room 
    async deleteRoom(id: string){
        return await RoomModel.findByIdAndDelete(id)
    }

    // Get a single Room
    async getRoom(filter: FilterQuery<Room>){
        return await RoomModel.findOne(filter)
    }

    // Get all Rooms 
    async getRooms (filter: FilterQuery<Room>){
        return await RoomModel.find(filter)   
    }
}

export default new RoomService()