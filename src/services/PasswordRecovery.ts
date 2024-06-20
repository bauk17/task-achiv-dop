import sendgrid from "@sendgrid/mail";
import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../Models/User";
import { hashPassword } from "../Handlers/handleHash";
dotenv.config();

export const EmailResponse = async (user_email: string) => {
  const sendGrid = sendgrid;
  sendGrid.setApiKey(process.env.SEND_GRID_API_KEY as string);

  const token = jwt.sign(
    { email: user_email },
    process.env.SECRET_JSON_KEY as string,
    { expiresIn: "1h" }
  );

  const changePasswordLink = `http://localhost:4000/change-password?token=${token}`;
  const message = {
    to: user_email, // user_email parameter goes here
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

export const PasswordRecovery = async (req: Request, res: Response) => {
  const user_email = req.body.email;

  try {
    const findUserEmail = await User.findOne({ where: { email: user_email } });
    if (findUserEmail) {
      EmailResponse(findUserEmail.email);
    }

    res.status(200).send({ message: "Password recovery e-mail sended" });
  } catch (error) {
    res.status(404).send({ message: "Internal server error!", error });
  }
};

export const ChangePassword = async (req: Request, res: Response) => {
  const recovery_token = req.params.token;
  const newPassword = req.body.newPassword;

  try {
    const decodedToken = jwt.verify(
      recovery_token,
      process.env.SECRET_JSON_KEY as string
    ) as { email: string };

    const userEmail = decodedToken.email;

    const findUser = await User.findOne({ where: { email: userEmail } });

    if (!findUser) {
      return res.status(404).send({ message: "User not founded" });
    }
    const hashedPassword = await hashPassword(newPassword);

    findUser.password = hashedPassword;

    await findUser.save();

    res.status(200).send({ message: "Password changed successfully" });
  } catch (error) {
    res.status(404).send({ message: "Internal server error!", error });
    console.error(error);
  }
};
