import mongoose from "mongoose";
import { RoomType } from './roomtype.interface';

export interface Room {
    _id: mongoose.Types.ObjectId;
    name: string;
    room_type: mongoose.Types.ObjectId | RoomType;
    price: number;
  }
  