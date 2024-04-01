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
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = __importDefault(require("argon2"));
const validation_1 = require("../validation");
const user_services_1 = __importDefault(require("../services/user.services"));
const user_model_1 = __importDefault(require("../models/user.model"));
class UserController {
    // Signing up
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const existingUser = yield user_services_1.default.getUser({ email });
            if (existingUser) {
                return res.status(500).json({
                    success: false,
                    message: "This email is already in use"
                });
            }
            const hash = yield argon2_1.default.hash(req.body.password, {
                type: argon2_1.default.argon2id,
                timeCost: 2,
                memoryCost: 2048,
            });
            const user = new user_model_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                role: req.body.role || "guest"
            });
            const newUser = yield user_services_1.default.addUser(user);
            return res.status(200).json({
                success: true,
                message: 'You have signed up successfully',
                data: newUser
            });
        });
    }
    // Loging in
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = validation_1.userSchemaValidation.validate(req.body);
            if (error) {
                return res.status(401).json({
                    message: error
                });
            }
            const email = req.body.email;
            const existingUser = yield user_services_1.default.getUser({ email });
            if (!existingUser) {
                return res.status(409).json({
                    message: "Authenticationd failed"
                });
            }
            const isVerified = yield argon2_1.default.verify(existingUser.password, req.body.password);
            if (!isVerified) {
                return res.status(401).json({
                    success: false,
                    message: "Authentications failed"
                });
            }
            const passkey = process.env.JWT_KEY;
            if (passkey) {
                const token = jsonwebtoken_1.default.sign({
                    email: existingUser.email,
                    userId: existingUser._id,
                    role: existingUser.role
                }, passkey, {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    success: true,
                    message: "You are looged in",
                    data: token
                });
            }
        });
    }
    // Getting registered Users
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            const users = yield user_services_1.default.getUsers(filter);
            return res.status(200).json({
                success: true,
                message: "Users",
                data: users
            });
        });
    }
    // Deleting a user
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield user_services_1.default.deleteUser(userId);
            return res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
        });
    }
}
exports.default = new UserController;
