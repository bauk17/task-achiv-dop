import { Response, Request } from "express";
import { Task } from "../Models/Task";
import { User } from "../Models/User";
import { isUserOwner } from "../Handlers/handleIsUserOwner";

export const increaseUserPoints = async (
  req: Request,
  res: Response,
  task_owner_id: number,
  pointsToAdd: number
) => {
  const checkIn = isUserOwner(req, task_owner_id);

  if (!checkIn) {
    return res.status(403).send({ message: "You are not the owner" });
  }

  try {
    const findUser = await User.findOne({ where: { id: task_owner_id } });

    if (findUser) {
      findUser.points += pointsToAdd;
      await findUser.save();

      return;
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error increasing user points:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
