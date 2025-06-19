import { configDotenv } from 'dotenv'
configDotenv()
import express from 'express'
import connectToDB from './config/dbConnection.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {userRoutes,productRoutes,quoteRoutes} from './routes/routes.index.js'
import errorMiddlware from './middlewares/errorMiddleware.js'
import cloudinary from './config/cloudinary.js'


// taking app instance
const app = express()



// database connection
connectToDB()

// middlewares
const corsOptions = {
    origin : process.env.FRONTEND_URL,
    credentials : true
}

app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended: true,limit:'10mb'}))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(morgan('dev'))


// test api's
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Vercel API' });
});
app.get('/', (req, res) => {
  res.json({ message: 'Homepage' });
});



// api's
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/product',productRoutes)
app.use('/api/v1/quote',quoteRoutes)
app.use(errorMiddlware)

export default app