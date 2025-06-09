import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
import AppError from '../utils/AppError.js'
config()

async function isLoggedIn(req,res,next){
    try {
        const {token} = req.cookies

        if(!token){
            return next(new AppError(400,'Unauthenticated user !'))
        }

        const userDetails = jwt.verify(token,process.env.SECRET)

        req.user = userDetails

        next()

    } catch (error) {
        console.log(error);
    }
}


const  authorizedRoles = (...roles) => async (req,res,next) =>{
    // console.log(req.user.role);
    
    const currentRole = req.user.role

    if(!roles.includes(currentRole)){
        return next(new AppError(400,'Access restricted for this route!'))
    }

    next()
}

export {authorizedRoles,isLoggedIn}