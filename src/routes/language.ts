import { Router } from "express";
import {
  addLanguage,
  deleteAllLanguages,
  deleteLanguagebyId,
  getAllLanguages,
  insertDefaultLangs,
} from "../services/language";

const router = Router();

router.get("/language/all", getAllLanguages);
router.delete("/language/all", deleteAllLanguages);
router.delete("/language/:id", deleteLanguagebyId);
router.post("/language", addLanguage);

router.get("/language/default", insertDefaultLangs);

export default router;
