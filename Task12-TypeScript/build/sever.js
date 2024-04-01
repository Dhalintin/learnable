"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 3000;
// const server = http.createServer(app);
app_1.default.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// server.listen(port, ()=>{
//     console.log(`Listening on port ${port}`)
// });
