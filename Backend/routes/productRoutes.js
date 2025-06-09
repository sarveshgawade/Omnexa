import { Router } from "express";
import { addProduct } from "../controllers/productController.js";

const router = Router()

router.post('/add', addProduct)

export default router