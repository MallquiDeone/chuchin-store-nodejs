import { Router } from "express";
import { 
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} from "../controllers/product.controllers.js";

const router = Router();

router.post("/product",createProduct);

router.get("/product",getProducts);

router.get("/product/:id",getProduct);

router.put("/product/:id",updateProduct);

router.delete("/product/:id",deleteProduct);

export default router;