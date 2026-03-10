import express from "express";
import {
  createRequest,
  getNearbyRequests,
  acceptRequest,
  getMyCreatedRequests,
  getMyAcceptedRequests,
} from "../controllers/requestController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
const router = express.Router()

router.post("/", protect, createRequest);

router.get("/nearby", protect, getNearbyRequests);

router.patch("/:id/accept", protect, allowRoles("donor"), acceptRequest);

router.get("/my-created", protect, getMyCreatedRequests);

router.get("/my-accepted", protect, allowRoles("donor"), getMyAcceptedRequests);

export default router;
