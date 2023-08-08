import { Router } from "express";
import {
  createDefaultStorage,
  getStorageInfo,
  updateStorageInfo,
} from "../services/storage";

const router = Router();

router.get("/storage", getStorageInfo);
router.patch("/storage", updateStorageInfo);
router.get("/storage/default", createDefaultStorage);

export default router;
