import { Router } from "express";
import {isLoggedIn,authorizedRoles}  from '../middlewares/authMiddleware.js'
import validateRequest from '../middlewares/validateRequest.js'
import {addQuote, deleteQuote, getAllQuotes, getQuote, updateQuote} from '../controllers/quoteController.js'
import {addQuoteSchema, updateQuoteSchema} from '../validators/quote/quoteValidatorSchema.index.js'

const router = Router()

router.post('/add', isLoggedIn, authorizedRoles('USER','ADMIN'), validateRequest(addQuoteSchema),addQuote )
router.delete('/delete/:quoteId', isLoggedIn, authorizedRoles('ADMIN'),deleteQuote )
router.get('/all', isLoggedIn, authorizedRoles('ADMIN'),getAllQuotes )
router.get('/:quoteId', isLoggedIn, authorizedRoles('ADMIN','USER'),getQuote )
router.patch('/update/:quoteId', isLoggedIn, authorizedRoles('ADMIN'),validateRequest(updateQuoteSchema),updateQuote )

export default router