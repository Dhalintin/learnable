import mongoose from "mongoose";

export interface RoomType {
    _id: mongoose.Types.ObjectId;
    name: string;
  }
  