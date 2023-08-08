import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategory,
  createSubCategory,
  getPostCategories,
  deleteCategory,
  editCategory,
} from "../services/category";
import { body } from "express-validator";
import { handleInputErrors } from "../modules/errorHandling";
import { protect } from "../modules/auth";

const router = Router();

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);
router.post("/category", createCategory);
router.post("/subcategory", createSubCategory);
router.get("/categoryPosts/:categoryId", getPostCategories);
router.put("/category/:categoryId", editCategory);
router.delete("/category/:categoryId", deleteCategory);

export default router;
