import express from "express";
import { becomeDonor, toggleDonorAvailability } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch("/become-donor", protect, becomeDonor);
router.patch("/toggle-donor", protect, toggleDonorAvailability);

export default router;