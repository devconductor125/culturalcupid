import { Router } from "express";
import {
  createSeniorAdmin,
  createOrUpdateStaticContent,
  getStaticContent,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  suspendUser,
  activateUser,
} from "../services/admin";

const router = Router();

// Admin routes
router.post("/admin/create-senior-admin", createSeniorAdmin);
router.get("/admin/static-content", getStaticContent);
router.post("/admin/static-content", createOrUpdateStaticContent);

router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.get("/users", getAllUsers);
router.get("/users/suspend/:id", suspendUser);
router.get("/users/activate/:id", activateUser);

export default router;
