import express from 'express'
import connectToDB from './config/dbConnection.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'


// taking app instance
const app = express()



// database connection
connectToDB()



// middlewares
const corsOptions = {
    origin : "http://localhost:5173",
    credentials : true
}

app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended: true,limit:'10mb'}))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(morgan('dev'))


// test api
app.use('/ping', (req,res) => res.send('Pong'))

// api's
// app.use('/api/v1/user',userRoutes)

export default app