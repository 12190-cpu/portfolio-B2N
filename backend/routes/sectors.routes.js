import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import {
  getSectors,
  getSectorById,
  createSector,
  updateSector,
  deleteSector
} from "../controllers/sectors.controller.js";

const router = express.Router();

router.get("/", getSectors);
router.get("/:id", getSectorById);

router.post("/", protect, createSector);
router.put("/:id", protect, updateSector);
router.delete("/:id", protect, deleteSector);

export default router;