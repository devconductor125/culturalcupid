import { Router } from "express";
import {
  createDefaultkeys,
  getkeysInfo,
  updatekeysInfo,
} from "../services/keys";

const router = Router();

router.get("/keys", getkeysInfo);
router.patch("/keys", updatekeysInfo);
router.post("/keys/default", createDefaultkeys);

export default router;
