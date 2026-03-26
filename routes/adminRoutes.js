import express from "express";
import { createHospital, getAllUsers, getAllHospitals, banUser, unbanUser, banHospital, unbanHospital } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/create-hospital", protect, allowRoles("admin"), createHospital);

router.get("/users", protect, allowRoles("admin"), getAllUsers);

router.get("/hospitals", protect, allowRoles("admin"), getAllHospitals);

router.patch("/users/:userId/ban", protect, allowRoles("admin"), banUser);
router.patch("/users/:userId/unban", protect, allowRoles("admin"), unbanUser);

router.patch("/hospitals/:hospitalId/ban", protect, allowRoles("admin"), banHospital);
router.patch("/hospitals/:hospitalId/unban", protect, allowRoles("admin"), unbanHospital);

export default router;