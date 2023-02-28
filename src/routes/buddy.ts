import express from "express";
import auth from "../middleware/auth";
import {
    AcceptInviteToBuddySaving,
  createBuddy,
  deleteSingleBuddySaving,
  getAllBuddies,
  getBuddySavingBySingleUser,
  getSingleBuddySaving,
  updateBuddySaving,
} from "../controllers/buddy";

const router = express();

router.get("/", getAllBuddies);
router.get("/user", auth, getBuddySavingBySingleUser);
router.get("/:id", getSingleBuddySaving);
router.post("/create", auth, createBuddy);
router.patch("/update/:id", auth, updateBuddySaving);
router.patch("/:id/accept-invite", auth, AcceptInviteToBuddySaving);
router.delete("/:id", auth, deleteSingleBuddySaving);

export default router;
