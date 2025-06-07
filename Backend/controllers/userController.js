import User from "../models/userModel.js"
import cloudinary from 'cloudinary'
import { configDotenv } from 'dotenv';
configDotenv()


const cookieOptions = {
    maxAge: 1*24*60*60*1000, // 1 day
    httpOnly: true,
    secure: false
}

const register = async(req,res,) =>{
    
    const {fullName,email,password,phoneNumber,role} = req.body

    if(!fullName || !email || !password || !phoneNumber){
       return res.status(500).json('All fields are required !') 
    }

    const userExists = await User.findOne({email})

    if(userExists){
        return res.status(500).json('User already exists !') 
    }

    const newUser = await User.create({
        fullName,
        email,
        password,
        role,
        phoneNumber
    })

    if(!newUser){
        return res.status(500).json('User registration failed !')
    }

    // save user in DB
    await newUser.save()

    // token generation
    const token = await newUser.generateJWTtoken()

    // put token into cookie
    res.cookie('token',token,cookieOptions) 

    // console.log(token);
    

    newUser.password = undefined
    res.status(200).json({
        success: true ,
        message: `User registered successfully`, 
        newUser
    })
}

const login = async (req,res) =>{
    // console.log("eeeeeeeeeeeeeeeeee");
    
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(500).json('All fields are required !') 
        }

        // getting password explicitly because it was selected as false in schema
        const existingUser = await User.findOne({
            email
        }).select('+password')  

        if(!existingUser || !(await existingUser.comparePassword(password))){
            return res.status(500).json('Email & password wont match !') 
        }

        const token = await existingUser.generateJWTtoken()
        res.cookie('token',token,cookieOptions)

        existingUser.password = undefined
        
        res.status(200).json({
            success: true,
            message: `User logged in successfully`,
            existingUser
        })
    } catch (e) {
        return res.status(500).json({
            success: false ,
            message: e.message
        })
    }
    

}

async function logout(req,res){
    try {
        res.cookie('token',null,{
            secure: true ,
            maxAge: 0 ,
            httpOnly: true
        })

        res.status(200).json({
            success: true ,
            message: 'User logged out'
        })
    } catch (error) {
        console.log(error);
    }
}


export {register,login,logout}