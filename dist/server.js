"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const Routes_1 = require("./routes/Routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const SERVER = (0, express_1.default)();
SERVER.use(express_1.default.json());
SERVER.use(express_1.default.urlencoded({ extended: true }));
SERVER.use((0, cookie_parser_1.default)());
SERVER.use((0, cors_1.default)());
SERVER.use(Routes_1.Routes);
SERVER.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running!`);
});
