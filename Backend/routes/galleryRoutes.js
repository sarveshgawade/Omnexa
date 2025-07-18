import { Router } from "express";
import { addImagesToGallery, getAllGalleryImages } from "../controllers/galleryController.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router()

router.post('/add',isLoggedIn, authorizedRoles('ADMIN'),upload.array('galleryImages', 10), addImagesToGallery)
router.get('/all',getAllGalleryImages)

export default router