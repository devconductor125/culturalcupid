import { Router } from "express";
import {
  createDefaultuploads,
  getuploadsInfo,
  updateuploadsInfo,
} from "../services/uploads";

const router = Router();

router.get("/uploads", getuploadsInfo);
router.patch("/uploads", updateuploadsInfo);
router.get("/uploads/default", createDefaultuploads);

export default router;
