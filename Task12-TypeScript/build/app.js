"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_route_1 = __importDefault(require("./routes/index.route"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/api/v1', index_route_1.default);
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => {
    console.log('Connected to the database');
}).catch(() => {
    console.log('There was an error connecting to your database');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
exports.default = app;
