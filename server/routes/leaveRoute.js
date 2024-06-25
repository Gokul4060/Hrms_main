import express from "express";
import {
  createLeave,
  getLeaves
} from "../controllers/leaveController.js";

import { protectRoute } from "../middlewares/authMiddlewave.js";

const router = express.Router();

router.post("/create-leave", protectRoute, createLeave);
router.get("/get-leave", protectRoute, getLeaves);

export default router;
