import express from "express";
import * as UserController from "../Controllers/UserLoginControl";
import * as UserProfileController from "../Controllers/UserProfile";
import * as TaskController from "../Controllers/TaskController";
import { verifyTokenMiddleware } from "../services/JWTokenAuthenticate";
import { isTaskDone } from "../Handlers/handleIsTaskDone";
import { ChangePassword, PasswordRecovery } from "../services/PasswordRecovery";
import { Request, Response } from "express";

export const Routes = express.Router();

// User Authentication

Routes.get("/", (req: Request, res: Response) => {
  res.send({ message: "It's working" });
});

Routes.post("/newAccount", UserController.createUserAccount);
Routes.post("/login", UserController.LoginUser);
Routes.get(
  "/userProfile",
  verifyTokenMiddleware,
  UserProfileController.getProfile
);

Routes.post("/logout", verifyTokenMiddleware, (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).send({ message: "User logged out successfully!" });
});

// Task Management

Routes.post("/newTask", verifyTokenMiddleware, TaskController.newTask);
Routes.get("/getTasks", verifyTokenMiddleware, TaskController.getTasks);
Routes.delete(
  "/deleteTask/:taskId",
  verifyTokenMiddleware,
  TaskController.deleteTask
);

Routes.put(
  "/changeTask/:taskId",
  verifyTokenMiddleware,
  TaskController.updateTask
);

Routes.get(
  "/countCompletedTasks",
  verifyTokenMiddleware,
  TaskController.countUserCompletedTasks
);

Routes.put("/doneTask/:taskId", verifyTokenMiddleware, isTaskDone);

// Password Recovery

Routes.post("/email-request", PasswordRecovery); // This send to user's email a link that will change your password

Routes.post("/change-password/:token", ChangePassword); // This route change the user password and uses token as parameter as well in params

Routes.get("/getTasks", UserController.getAllTasks);
