import {Router} from 'express'
import {register,login,logout,getProfile, changePassword, updateUser} from '../controllers/userController.js'
import {isLoggedIn } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/register',register)
router.post('/login',login)
router.get('/profile',isLoggedIn,getProfile)
router.get('/logout',isLoggedIn,logout)
router.post('/change-password',isLoggedIn,changePassword)
router.post('/update',isLoggedIn,updateUser)

export default router