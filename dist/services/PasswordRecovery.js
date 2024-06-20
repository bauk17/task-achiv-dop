"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePassword = exports.PasswordRecovery = exports.EmailResponse = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../Models/User");
const handleHash_1 = require("../Handlers/handleHash");
dotenv_1.default.config();
const EmailResponse = async (user_email) => {
    const sendGrid = mail_1.default;
    sendGrid.setApiKey(process.env.SEND_GRID_API_KEY);
    const token = jsonwebtoken_1.default.sign({ email: user_email }, process.env.SECRET_JSON_KEY, { expiresIn: "1h" });
    const changePasswordLink = `http://localhost:4000/change-password?token=${token}`;
    const message = {
        to: user_email,
        from: "dopaminergictodo@gmail.com",
        subject: "Dopaminergic To-do Recovery Password",
        text: `You requested to reset your password. Click the following link to reset your password: ${changePasswordLink}`,
        html: `You requested to reset your password. Click the following link to reset your password: <a href="${changePasswordLink}">${changePasswordLink}</a>`,
    };
    sendGrid
        .send(message)
        .then(() => {
        console.log("Email sent");
    })
        .catch((error) => {
        console.error(error);
    });
};
exports.EmailResponse = EmailResponse;
const PasswordRecovery = async (req, res) => {
    const user_email = req.body.email;
    try {
        const findUserEmail = await User_1.User.findOne({ where: { email: user_email } });
        if (findUserEmail) {
            (0, exports.EmailResponse)(findUserEmail.email);
        }
        res.status(200).send({ message: "Password recovery e-mail sended" });
    }
    catch (error) {
        res.status(404).send({ message: "Internal server error!", error });
    }
};
exports.PasswordRecovery = PasswordRecovery;
const ChangePassword = async (req, res) => {
    const recovery_token = req.params.token;
    const newPassword = req.body.newPassword;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(recovery_token, process.env.SECRET_JSON_KEY);
        const userEmail = decodedToken.email;
        const findUser = await User_1.User.findOne({ where: { email: userEmail } });
        if (!findUser) {
            return res.status(404).send({ message: "User not founded" });
        }
        const hashedPassword = await (0, handleHash_1.hashPassword)(newPassword);
        findUser.password = hashedPassword;
        await findUser.save();
        res.status(200).send({ message: "Password changed successfully" });
    }
    catch (error) {
        res.status(404).send({ message: "Internal server error!", error });
        console.error(error);
    }
};
exports.ChangePassword = ChangePassword;
