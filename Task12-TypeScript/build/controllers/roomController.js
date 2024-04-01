"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_services_1 = __importDefault(require("../services/room.services"));
const room_model_1 = __importDefault(require("../models/room.model"));
// import roomType from '../routes/roomtype.route';
const mongoose_1 = __importDefault(require("mongoose"));
class RoomController {
    // Getting all rooms
    getAllRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allRooms = yield room_services_1.default.getRooms({});
            return res.status(200).json({
                data: allRooms
            });
        });
    }
    // Adding new room
    addNewRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const existingRoom = yield room_services_1.default.getRooms({ title: body.name.toLowerCase() });
            const filter = {};
            if (existingRoom.length > 0) {
                return res.status(401).json({
                    success: false,
                    message: 'This name is already in use for a room'
                });
            }
            const room = new room_model_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                name: req.body.name,
                room_type: req.body.roomtype || '65f485df2c3e9dea3442e6f5',
                price: req.body.price || 100
            });
            const newRoom = yield room_services_1.default.addRoom(room);
            return res.status(200).json({
                success: true,
                message: 'New Room added successfully',
                data: newRoom
            });
        });
    }
    // Getting a single room
    getRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomId = req.params.id;
            const roomToGet = yield room_services_1.default.getRoom({ _id: roomId });
            if (!roomToGet) {
                return res.status(500).json({
                    success: false,
                    message: 'Room not found'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Room found',
                data: roomToGet
            });
        });
    }
    // Updating a room
    editRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomId = req.params.id;
            const updateData = req.body;
            const roomToEdit = yield room_services_1.default.getRoom({ _id: roomId });
            if (!roomToEdit) {
                return res.status(500).json({
                    success: false,
                    message: 'Room not found'
                });
            }
            if (updateData.name) {
                const existingRoomName = yield room_services_1.default.getRoom({ name: updateData.name.toLowerCase() });
                if (existingRoomName) {
                    return res.status(400).json({
                        success: false,
                        message: 'This name has already been used for another room'
                    });
                }
                const updatedBook = yield room_services_1.default.updateRoom(roomId, updateData);
                return res.status(200).json({
                    success: true,
                    message: 'Room updated successfully',
                    data: updatedBook
                });
            }
        });
    }
    // Deleting a Room
    deleteRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomId = req.params.id;
            const roomToDelete = yield room_services_1.default.getRoom({ _id: roomId });
            if (!roomToDelete) {
                return res.status(404).json({
                    success: false,
                    message: 'Room not found'
                });
            }
            yield room_services_1.default.deleteRoom(roomId);
            return res.status(200).json({
                success: true,
                message: 'Room deleted successfully',
            });
        });
    }
}
exports.default = new RoomController;
