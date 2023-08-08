import { Router } from "express";
import {
    createPlan,
    deletePlan,
    editPlan,
    getAllPlans,
    getPlan
} from "../services/plan";


const router = Router();

router.get("/plan/:planName", getPlan);
router.get("/plan", getAllPlans);
router.post("/plan", createPlan);
router.put("/plan", editPlan);
router.delete("/plan/:planName", deletePlan);

export default router;
