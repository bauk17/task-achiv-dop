"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increaseUserPoints = void 0;
const User_1 = require("../Models/User");
const handleIsUserOwner_1 = require("../Handlers/handleIsUserOwner");
const increaseUserPoints = async (req, res, task_owner_id, pointsToAdd) => {
    const checkIn = (0, handleIsUserOwner_1.isUserOwner)(req, task_owner_id);
    if (!checkIn) {
        return res.status(403).send({ message: "You are not the owner" });
    }
    try {
        const findUser = await User_1.User.findOne({ where: { id: task_owner_id } });
        if (findUser) {
            findUser.points += pointsToAdd;
            await findUser.save();
            return;
        }
        else {
            return res.status(404).send({ message: "User not found" });
        }
    }
    catch (error) {
        console.error("Error increasing user points:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};
exports.increaseUserPoints = increaseUserPoints;
