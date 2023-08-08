import { Router } from "express";
import { protect } from "../modules/auth";
import { getTransactionsByUserId } from "../services/transactions";

const router = Router();
router.get("/transactions/all", protect, getTransactionsByUserId);
export default router;
