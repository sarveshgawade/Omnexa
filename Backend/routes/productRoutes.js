import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/productController.js";
import validateRequest from "../middlewares/validateRequest.js";
import {addProductSchema, updateProductSchema} from '../validators/product/productValidatorSchema.index.js'

const router = Router()

router.post('/add', validateRequest(addProductSchema),addProduct)
router.delete('/delete/:productId', deleteProduct)
router.get('/all', getAllProducts)
router.get('/:productId', getProduct)
router.patch('/update/:productId', validateRequest(updateProductSchema), updateProduct)

export default router