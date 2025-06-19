import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/productController.js";
import validateRequest from "../middlewares/validateRequest.js";
import {addProductSchema, updateProductSchema} from '../validators/product/productValidatorSchema.index.js'
import {isLoggedIn, authorizedRoles} from '../middlewares/authMiddleware.js'
import {upload} from '../middlewares/multerMiddleware.js'

const router = Router()

router.post('/add', isLoggedIn, authorizedRoles('ADMIN'),validateRequest(addProductSchema),upload.single('productImage'),addProduct)
router.delete('/delete/:productId', isLoggedIn, authorizedRoles('ADMIN'), deleteProduct)
router.get('/all', getAllProducts)
router.get('/:productId', getProduct)
router.patch('/update/:productId', isLoggedIn, authorizedRoles('ADMIN'), validateRequest(updateProductSchema), upload.single('productImage'),updateProduct)

export default router