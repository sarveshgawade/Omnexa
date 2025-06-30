import {User} from "../models/model.index.js"
import { configDotenv } from 'dotenv';
configDotenv()
import catchAsync from  '../utils/catchAsync.js'
import AppError from "../utils/AppError.js";
import sendEmail from "../utils/sendEmail.js";
import { registerEmailTemplate } from "../emailTemplates/registerEmailTemplate.js";

const cookieOptions = {
  maxAge: 1 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // only true in production
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
};


const register = catchAsync(async(req,res,next) =>{
    
    const {fullName,email,password,phoneNumber,role} = req.body

    const userExists = await User.findOne({email})

    if (userExists) {
        return next(new AppError(400, 'User already exists!'));
    }

    const newUser = await User.create({
        fullName,
        email,
        password,
        role,
        phoneNumber
    })

    if (!newUser) {
        return next(new AppError(400, 'User registration failed!'));
    }

    // save user in DB
    await newUser.save()

    // token generation
    const token = await newUser.generateJWTtoken()

    // put token into cookie
    res.cookie('token',token,cookieOptions) 

    try {
        const html = registerEmailTemplate(fullName)

        await sendEmail({
            to: email,
            subject: "Welcome to Omnexa Global Trade.",
            html
        });
    } catch (error) {
        return next(new AppError(400, 'Error in sending email for user!'));
    }

    newUser.password = undefined
    res.status(200).json({
        success: true ,
        message: `User registered successfully`, 
        user: newUser
    })
})

const login = catchAsync(async (req,res,next) =>{
    const {email,password} = req.body

    // getting password explicitly because it was selected as false in schema
    const existingUser = await User.findOne({
        email
    }).select('+password')  

    if(!existingUser || !(await existingUser.comparePassword(password))){
        return next(new AppError(400,'Email & password wont match !'))
        // return res.status(500).json() 
    }

    const token = await existingUser.generateJWTtoken()
    res.cookie('token',token,cookieOptions)

    existingUser.password = undefined
    
    res.status(200).json({
        success: true,
        message: `User logged in successfully`,
        user : existingUser
    }) 

})

const logout =  catchAsync(async  (req,res) => {
    if (!req.cookies.token) {
        throw new ErrorHandler('User is already logged out', 401);
    }

    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        expires: new Date(0), 
        maxAge: 0
    });

    res.status(200).json({
        success: true ,
        message: 'User logged out'
    })
})

const getProfile = catchAsync(async (req,res,next) => {
        const userID = req.user.id

        const userProfile = await User.findById(userID)

        if(!userProfile) {
            return next(new AppError(400,'User not found'))
        }

        res.status(200).json({
            success: true ,
            message: 'User details found !',
            user : userProfile
        })
})

const changePassword = catchAsync(async  (req,res,next) => {
    const {oldPassword, newPassword} = req.body
    const userID = req.user.id

    if(!oldPassword || !newPassword){return next(new AppError(400,'All fields are required !'))}

    if(oldPassword == newPassword) {return next(new AppError(400,'Old and New password are same'))}

    const user = await User.findById(userID).select('+password')

    if(!user) {return next(new AppError(400,'User not found'))}

    const isPasswordCorrect = await user.comparePassword(oldPassword)

    if(!isPasswordCorrect){return next(new AppError(400,'Old password is invalid'))}

    user.password = newPassword

    await user.save()

    user.password = undefined

    res.status(200).json({
        success: true ,
        message: 'Password changed',
    })

})

const updateUser = catchAsync(async (req,res) =>{
    
    const {fullName,phoneNumber,email} = req.body
    const id = req.user.id    

    const userExists = await User.findById(id)

    if(!userExists){
       return next(new AppError(400,'User does not exist !'))
    }

    let updates = {}

    if(fullName) updates.fullName = fullName ;
    if(phoneNumber) updates.phoneNumber = phoneNumber ;
    if(email) updates.email = email ;

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
    })

    if(!updatedUser){
        return next(new AppError(400,'Error in updating user'))
    }

    await updatedUser.save({ validateModifiedOnly: true });


    res.status(200).json({
        success: true ,
        message: `Profile changed successfully`,
        updatedUser
    })
})


export {register,login,logout,getProfile,changePassword,updateUser}