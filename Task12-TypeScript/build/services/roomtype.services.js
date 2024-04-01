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
const roomtype_model_1 = __importDefault(require("../models/roomtype.model"));
class RoomTypeService {
    // Add Room
    addRoomType(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomtype_model_1.default.create(data);
        });
    }
    // Update a RoomType 
    updateRoomType(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomtype_model_1.default.findByIdAndUpdate(id, updateData, {
                new: true
            });
        });
    }
    // Delete a RoomType 
    deleteRoomType(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomtype_model_1.default.findByIdAndDelete(id);
        });
    }
    // Get a single RoomType
    getRoomType(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomtype_model_1.default.findOne(filter);
        });
    }
    // Get all RoomTypes 
    getRoomTypes(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomtype_model_1.default.find(filter);
        });
    }
}
exports.default = new RoomTypeService();
