import { Router } from "express";
import { addNewContact, deleteContact, getContactById, getContacts } from "../controllers/contactController.js";
import {isLoggedIn, authorizedRoles} from '../middlewares/authMiddleware.js'
import validateRequest from "../middlewares/validateRequest.js";
import addContactSchema from "../validators/contact/addContactSchema.js";

const router = Router()

router.post('/addNewContact', validateRequest(addContactSchema), addNewContact)
router.get('/all',isLoggedIn, authorizedRoles('ADMIN'), getContacts)
router.get('/:id',isLoggedIn, authorizedRoles('ADMIN'), getContactById)
router.delete('/:id',isLoggedIn, authorizedRoles('ADMIN'), deleteContact)

export default router