"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
//Sign Up
router.post('/signup', userController_1.default.signUp);
//Log in
router.post('/login', userController_1.default.login);
//Get all User
router.get('/', userController_1.default.getUser);
// Delete a User
router.delete('/:id', userController_1.default.deleteUser);
exports.default = router;
