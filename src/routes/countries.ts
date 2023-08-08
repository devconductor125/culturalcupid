import { Router } from "express";
import {
  addCountry,
  deleteAllCountries,
  deleteCountrybyId,
  getAllCountries,
  insertDefaultCountries,
} from "../services/countries";

const router = Router();

router.get("/country/all", getAllCountries);
router.delete("/country/all", deleteAllCountries);
router.delete("/country/:id", deleteCountrybyId);
router.post("/country", addCountry);

router.get("/country/default", insertDefaultCountries);

export default router;
