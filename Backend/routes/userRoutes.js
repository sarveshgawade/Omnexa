import {Router} from 'express'
import {register,login,logout,getProfile, changePassword, updateUser,forgotPassword, resetPassword} from '../controllers/userController.js'
import {isLoggedIn } from '../middlewares/authMiddleware.js'
import validateRequest from '../middlewares/validateRequest.js'
import {changePasswordUserSchema, loginUserSchema, registerUserSchema, updateUserSchema} from '../validators/user/userSchema.index.js'

const router = Router()

router.post('/register',validateRequest(registerUserSchema) ,register)
router.post('/login',validateRequest(loginUserSchema),login)
router.get('/profile',isLoggedIn,getProfile)
router.get('/logout',isLoggedIn,logout)
router.post('/change-password',isLoggedIn,validateRequest(changePasswordUserSchema),changePassword)
router.post('/update',isLoggedIn, validateRequest(updateUserSchema),updateUser)
router.post('/forgot-password',isLoggedIn,forgotPassword)
router.patch('/reset-password/:token',isLoggedIn,resetPassword)

export default router