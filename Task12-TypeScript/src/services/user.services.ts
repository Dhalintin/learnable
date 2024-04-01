import { FilterQuery, UpdateQuery } from 'mongoose';
import UserModel from '../models/user.model'
import { User } from '../interfaces/user.interface';

class UserService{

    // Add Room
    async addUser(data: User){
        return await UserModel.create(data)
    }

    // Update a RoomType 
    // async updateUser(id: string, updateData: UpdateQuery<User>){
    //     return await UserModel.findByIdAndUpdate(id, updateData, {
    //         new: true
    //     })
    // }

    // Delete a RoomType 
    async deleteUser(id: string){
        return await UserModel.findByIdAndDelete(id)
    }

    // Get a single RoomType
    async getUser(filter: FilterQuery<User>){
        return await UserModel.findOne(filter)
    }

    // Get all RoomTypes 
    async getUsers (filter: FilterQuery<User>){
        return await UserModel.find(filter)   
    }
}

export default new UserService()