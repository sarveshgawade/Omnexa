import { Router } from "express";
import { addNewContact } from "../controllers/contactController.js";

const router = Router()

router.post('/addNewContact',addNewContact)

export default router