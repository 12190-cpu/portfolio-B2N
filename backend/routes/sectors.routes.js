import express from "express";

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

router.post("/", createSector);

router.put("/:id", updateSector);

router.delete("/:id", deleteSector);

export default router;