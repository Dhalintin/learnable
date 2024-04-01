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
const roomtype_services_1 = __importDefault(require("../services/roomtype.services"));
const roomtype_model_1 = __importDefault(require("../models/roomtype.model"));
const mongoose_1 = __importDefault(require("mongoose"));
class RoomTypeController {
    // Getting all roomtypes
    getAllRoomTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allRoomTypes = yield roomtype_services_1.default.getRoomTypes({});
            return res.status(200).json({
                data: allRoomTypes
            });
        });
    }
    // Adding new roomtype
    addNewRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const existingRoomType = yield roomtype_services_1.default.getRoomTypes({ name: body.name.toLowerCase() });
            const filter = {};
            if (existingRoomType.length > 0) {
                return res.status(401).json({
                    success: false,
                    message: "This name is already in use for a room"
                });
            }
            const roomType = new roomtype_model_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                name: req.body.name,
            });
            const newRoomType = yield roomtype_services_1.default.addRoomType(roomType);
            return res.status(200).json({
                success: true,
                message: 'New Room added successfully',
                data: newRoomType
            });
        });
    }
    // Getting a single roomtype
    getRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomId = req.params.id;
            const roomTypeToGet = yield roomtype_services_1.default.getRoomType({ _id: roomId });
            if (!roomTypeToGet) {
                return res.status(500).json({
                    success: false,
                    message: 'Room not found'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Room found',
                data: roomTypeToGet
            });
        });
    }
    // Updating a roomtype
    editRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomtypeId = req.params.id;
            const updateData = req.body;
            const roomTypeToEdit = yield roomtype_services_1.default.getRoomType({ _id: roomtypeId });
            if (!roomTypeToEdit) {
                return res.status(500).json({
                    success: false,
                    message: 'Roomtype not found'
                });
            }
            if (updateData.name) {
                const existingRoomTypeName = yield roomtype_services_1.default.getRoomType({ name: updateData.name.toLowerCase() });
                if (existingRoomTypeName) {
                    return res.status(400).json({
                        success: false,
                        message: 'This name has already been used for another room'
                    });
                }
                const updatedRoom = yield roomtype_services_1.default.updateRoomType(roomtypeId, updateData);
                return res.status(200).json({
                    success: true,
                    message: 'Room updated successfully',
                    data: updatedRoom
                });
            }
        });
    }
    // Deleting a Roomtype
    deleteRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomTypeId = req.params.id;
            const roomTypeToDelete = yield roomtype_services_1.default.getRoomType({ _id: roomTypeId });
            if (!roomTypeToDelete) {
                return res.status(404).json({
                    success: false,
                    message: 'Room not found'
                });
            }
            yield roomtype_services_1.default.deleteRoomType(roomTypeId);
            return res.status(200).json({
                success: true,
                message: 'Roomtype deleted successfully',
            });
        });
    }
}
exports.default = new RoomTypeController;
