import {Router} from 'express'
import {register,login,logout} from '../controllers/userController.js'
import {  authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/register',register)
router.post('/login',login)
// router.get('/my-profile',isLoggedIn,getProfile)
router.get('/logout',isLoggedIn,logout)
// router.post('/change-password',isLoggedIn,changePassword)
// router.post('/update',isLoggedIn,upload.single('avatar'),updateUser)
// router.post('/check',isLoggedIn,authorizedRoles('ADMIN'),check)

export default router