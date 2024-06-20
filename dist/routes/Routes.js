"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = __importDefault(require("express"));
const UserController = __importStar(require("../Controllers/UserLoginControl"));
const UserProfileController = __importStar(require("../Controllers/UserProfile"));
const TaskController = __importStar(require("../Controllers/TaskController"));
const JWTokenAuthenticate_1 = require("../services/JWTokenAuthenticate");
const handleIsTaskDone_1 = require("../Handlers/handleIsTaskDone");
const PasswordRecovery_1 = require("../services/PasswordRecovery");
exports.Routes = express_1.default.Router();
// User Authentication
exports.Routes.get("/", (req, res) => {
    res.send({ message: "It's working" });
});
exports.Routes.post("/newAccount", UserController.createUserAccount);
exports.Routes.post("/login", UserController.LoginUser);
exports.Routes.get("/userProfile", JWTokenAuthenticate_1.verifyTokenMiddleware, UserProfileController.getProfile);
// Task Management
exports.Routes.post("/newTask", JWTokenAuthenticate_1.verifyTokenMiddleware, TaskController.newTask);
exports.Routes.get("/getTasks", JWTokenAuthenticate_1.verifyTokenMiddleware, TaskController.getTasks);
exports.Routes.delete("/deleteTask/:taskId", JWTokenAuthenticate_1.verifyTokenMiddleware, TaskController.deleteTask);
exports.Routes.put("/changeTask/:taskId", JWTokenAuthenticate_1.verifyTokenMiddleware, TaskController.updateTask);
exports.Routes.put("/doneTask/:taskId", JWTokenAuthenticate_1.verifyTokenMiddleware, handleIsTaskDone_1.isTaskDone);
// Password Recovery
exports.Routes.post("/email-request", PasswordRecovery_1.PasswordRecovery); // This send to user's email a link that will change your password
exports.Routes.post("/change-password/:token", PasswordRecovery_1.ChangePassword); // This route change the user password and uses token as parameter as well in params
exports.Routes.get("/get-tasks", UserController.getAllTasks);
