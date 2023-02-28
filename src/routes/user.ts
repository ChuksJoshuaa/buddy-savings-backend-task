import express from "express";
import { signin, signup } from "../controllers/user";

const router = express();

router.post("/register", signup);
router.post("/login", signin);

export default router;
