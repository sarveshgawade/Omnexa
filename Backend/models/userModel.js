import { config } from 'dotenv'
config()
import mongoose, { model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwtToken from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    fullName:{
        type:'String',
        required: [true,`Name is a required field`] ,
        trim: true ,

    },
    email:{
        type:'String',
        required: [true,`Email is a required field`] ,
        trim: true ,
        unique: true ,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
          ] 

    },
    password:{
        type:'String',
        required: [true,`Password is a required field`] ,
        trim: true ,
        select : false   ,
        minLength : [6,`Password must be atleast of 6 characters`]  
    },
    role:{
        type:'String',
        enum: ['USER','ADMIN'],
        default: 'USER'
    },
    phoneNumber:{
        type: 'String',
        required: [true,'phoneNumber is required ']
    },
    passwordResetToken:{
        type: 'String',
        select: false
    },
    passwordResetTokenExpiry:{
        type: Date
    }

},{
    timestamps:true
})

// ENCRYPTING PASSWORD
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,7)
})


// JWT TOKEN GENERATION
userSchema.methods = {
    generateJWTtoken: async function(){
        return await jwtToken.sign(
            {id:this._id, email: this.email, role: this.role, fullName: this.fullName},
            process.env.SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    },
    comparePassword: async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password)
    },
    generatePasswordResetToken:  function () {
        const resetToken = crypto.randomBytes(32).toString('hex') 
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetTokenExpiry = Date.now() + 10*60*1000 // 10 min

        return resetToken
    }

}

const User = model('User',userSchema)

export default User