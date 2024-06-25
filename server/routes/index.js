import express from "express";
import userRoutes from "./userRoutes.js";
import profileRoutes from "./profileRoutes.js";
import leaveRoutes from "./leaveRoute.js"; 




const router = express.Router();

router.use("/user", userRoutes); 
router.use("/profile", profileRoutes);
router.use("/leave", leaveRoutes); 


export default router;
