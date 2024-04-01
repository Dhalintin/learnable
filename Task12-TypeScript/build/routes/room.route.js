"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomController_1 = __importDefault(require("../controllers/roomController"));
const room_validation_1 = __importDefault(require("../middlewares/room.validation"));
const user_auth_1 = __importDefault(require("../middlewares/user.auth"));
const router = express_1.default.Router();
// Get all rooms with or without specific parameters
router.get('/', roomController_1.default.getAllRooms);
// Create a new room
router.post('/', user_auth_1.default, room_validation_1.default, roomController_1.default.addNewRoom);
// Get a specific room by ID
router.get('/:id', roomController_1.default.getRoom);
// Update a specific room
router.patch('/:id', user_auth_1.default, roomController_1.default.editRoom);
// Delete a specific room
router.delete('/:id', user_auth_1.default, roomController_1.default.deleteRoom);
exports.default = router;
