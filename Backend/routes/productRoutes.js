import { Router } from "express";
import { addProduct } from "../controllers/productController.js";
import validateRequest from "../middlewares/validateRequest.js";
import {addProductSchema} from '../validators/product/productValidatorSchema.index.js'

const router = Router()

router.post('/add', validateRequest(addProductSchema),addProduct)

export default router