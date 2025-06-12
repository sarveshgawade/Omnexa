import { Router } from "express";
import {isLoggedIn,authorizedRoles}  from '../middlewares/authMiddleware.js'
import validateRequest from '../middlewares/validateRequest.js'
import {addQuote} from '../controllers/quoteController.js'
import {addQuoteSchema} from '../validators/quote/quoteValidatorSchema.index.js'

const router = Router()

router.post('/add', isLoggedIn, authorizedRoles('USER','ADMIN'), validateRequest(addQuoteSchema),addQuote )

export default router