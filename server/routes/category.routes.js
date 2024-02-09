import { Router } from "express";
import { 
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controllers.js";

const router = Router();

router.post('/category', createCategory);

router.get("/category", getCategories);

router.get("/category/:id", getCategory);

router.put("/category/:id", updateCategory);

router.delete("/category/:id", deleteCategory);

export default router;