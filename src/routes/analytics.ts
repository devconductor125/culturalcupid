import { Router } from "express";
import {
  createDefaultanalytics,
  getAnalyticsInfo,
  updateanalyticsInfo,
} from "../services/analytics";

const router = Router();

router.get("/analytics", getAnalyticsInfo);
router.patch("/analytics", updateanalyticsInfo);
router.get("/analytics/default", createDefaultanalytics);

export default router;
