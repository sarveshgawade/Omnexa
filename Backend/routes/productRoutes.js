import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProduct } from "../controllers/productController.js";
import validateRequest from "../middlewares/validateRequest.js";
import {addProductSchema} from '../validators/product/productValidatorSchema.index.js'

const router = Router()

router.post('/add', validateRequest(addProductSchema),addProduct)
router.delete('/delete/:productId', deleteProduct)
router.get('/all', getAllProducts)
router.get('/:productId', getProduct)

export default router