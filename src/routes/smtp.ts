import { Router } from "express";
import {
  createDefaultSmtp,
  updateSmtpInfo,
  getSmtpInfo,
} from "../services/smtp";

const router = Router();

router.get("/smtp", getSmtpInfo);
router.patch("/smtp", updateSmtpInfo);
router.get("/smtp/default", createDefaultSmtp);

export default router;
