import { Router } from "express";
import { addNewContact, getContactById, getContacts } from "../controllers/contactController.js";
import {isLoggedIn, authorizedRoles} from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/addNewContact',addNewContact)
router.get('/all',isLoggedIn, authorizedRoles('ADMIN'), getContacts)
router.get('/:id',isLoggedIn, authorizedRoles('ADMIN'), getContactById)

export default router