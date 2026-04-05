import express from "express";
import {
  createHospital,
  getAllUsers,
  getAllHospitals,
  banUser,
  unbanUser,
  searchUsers,
  banHospital,
  unbanHospital
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// 🏥 Create Hospital
router.post(
  "/create-hospital",
  protect,
  allowRoles("admin"),
  createHospital
);

// 👥 Get All Users
router.get(
  "/users",
  protect,
  allowRoles("admin"),
  getAllUsers
);

// 🔍 Search Users (name/email)
router.get(
  "/users/search",
  protect,
  allowRoles("admin"),
  searchUsers
);

// 🏥 Get All Hospitals
router.get(
  "/hospitals",
  protect,
  allowRoles("admin"),
  getAllHospitals
);

// 🚫 Ban / Unban User
router.patch(
  "/users/:userId/ban",
  protect,
  allowRoles("admin"),
  banUser
);

router.patch(
  "/users/:userId/unban",
  protect,
  allowRoles("admin"),
  unbanUser
);



// 🚫 Ban / Unban Hospital
router.patch(
  "/hospitals/:id/ban",
  protect,
  allowRoles("admin"),
  banHospital
);

router.patch(
  "/hospitals/:id/unban",
  protect,
  allowRoles("admin"),
  unbanHospital
);
export default router;