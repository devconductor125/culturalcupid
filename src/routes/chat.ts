import { Router } from "express";
import {
  createNewMessage,
  getMessages,
  getMessagesByUserId,
} from "../services/chat";
import { protect } from "../modules/auth";

const router = Router();
router.post("/message", protect, createNewMessage);
router.get("/message/:user1Id/:user2Id", protect, getMessages);
router.get("/message/:userId", protect, getMessagesByUserId);
export default router;
