"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const roomTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true }
});
const RoomTypeModel = mongoose.model('RoomType', roomTypeSchema);
exports.default = RoomTypeModel;
