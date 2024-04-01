"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomTypeController_1 = __importDefault(require("../controllers/roomTypeController"));
const admin_auth_1 = __importDefault(require("../middlewares/admin.auth"));
const roomType_validation_1 = __importDefault(require("../middlewares/roomType.validation"));
const router = express_1.default.Router();
// Get all rooms with or without specific parameters
router.get('/', roomTypeController_1.default.getAllRoomTypes);
// Create a new roomtype
router.post('/', admin_auth_1.default, roomType_validation_1.default, roomTypeController_1.default.addNewRoomType);
// Get a specific room by ID
router.get('/:id', roomTypeController_1.default.getRoomType);
// Update a specific room
router.patch('/:id', admin_auth_1.default, roomType_validation_1.default, roomTypeController_1.default.editRoomType);
// Delete a specific room
router.delete('/:id', admin_auth_1.default, roomType_validation_1.default, roomTypeController_1.default.deleteRoomType);
exports.default = router;
