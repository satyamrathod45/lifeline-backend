import express from "express";
import { registerUser, loginUser, logoutUser , getProfile , forgotPassword , resetPassword} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getProfile);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

export default router;