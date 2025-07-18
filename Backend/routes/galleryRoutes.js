import { Router } from "express";
import { addImagesToGallery, deleteAllImages, deleteImageById, getAllGalleryImages } from "../controllers/galleryController.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router()

router.post('/add',isLoggedIn, authorizedRoles('ADMIN'),upload.array('galleryImages', 10), addImagesToGallery)
router.get('/all',getAllGalleryImages)
router.delete('/delete/all',isLoggedIn, authorizedRoles('ADMIN'),deleteAllImages)
router.delete('/delete/:imageId',isLoggedIn, authorizedRoles('ADMIN'),deleteImageById)

export default router