import { Router } from "express";
import {
  createDefaulttheme,
  getthemeInfo,
  updatethemeInfo,
} from "../services/theme";

const router = Router();

router.get("/theme", getthemeInfo);
router.patch("/theme", updatethemeInfo);
router.get("/theme/default", createDefaulttheme);

export default router;
