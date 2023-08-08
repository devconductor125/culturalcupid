import { Router } from "express";
import {
  createDefaultPayments,
  getpaymentsInfo,
  updatePaymentsInfo,
} from "../services/payments";

const router = Router();

router.get("/payments", getpaymentsInfo);
router.patch("/payments", updatePaymentsInfo);
router.get("/payments/default", createDefaultPayments);

export default router;
