import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProduct, getProductQuantityTypes, updateProduct } from "../controllers/productController.js";
import validateRequest from "../middlewares/validateRequest.js";
import {addProductSchema, updateProductSchema} from '../validators/product/productValidatorSchema.index.js'
import {isLoggedIn, authorizedRoles} from '../middlewares/authMiddleware.js'
import {upload} from '../middlewares/multerMiddleware.js'

const router = Router()

router.post('/add', isLoggedIn, authorizedRoles('ADMIN'),validateRequest(addProductSchema),upload.fields([
    {name: 'productThumbnail', maxCount:1},
    {name: 'productImages', maxCount:6}
]),addProduct)
router.delete('/delete/:productId', isLoggedIn, authorizedRoles('ADMIN'), deleteProduct)
router.get('/all', getAllProducts)
router.get('/productQuantityTypes',getProductQuantityTypes)
router.get('/:productId', getProduct)
router.patch('/update/:productId', isLoggedIn, authorizedRoles('ADMIN'), validateRequest(updateProductSchema), upload.fields([
    {name: 'productThumbnail', maxCount:1},
    {name: 'productImages', maxCount:6}
]),updateProduct)


export default router