import { Router } from "express";
import { addProduct, deleteProduct } from "../controllers/productController.js";
import validateRequest from "../middlewares/validateRequest.js";
import {addProductSchema} from '../validators/product/productValidatorSchema.index.js'

const router = Router()

router.post('/add', validateRequest(addProductSchema),addProduct)
router.delete('/delete/:productId', deleteProduct)

export default router