"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomTypeSchemaValidation = exports.roomSchemaValidation = exports.userSchemaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchemaValidation = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required()
});
exports.roomSchemaValidation = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).required(),
    room_type: joi_1.default.string().length(24).required(),
    price: joi_1.default.number().integer().required()
});
exports.roomTypeSchemaValidation = joi_1.default.object({
    name: joi_1.default.string().min(3).max(20).required()
});
exports.default = { userSchemaValidation: exports.userSchemaValidation, roomSchemaValidation: exports.roomSchemaValidation, roomTypeSchemaValidation: exports.roomTypeSchemaValidation };
