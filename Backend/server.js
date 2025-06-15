import { configDotenv } from 'dotenv';
configDotenv()
import app from './app.js'
import cloudinary from './config/cloudinary.js'

const PORT = process.env.PORT || 3020

// server listens here !
app.listen(PORT, ()=>{
    console.log(`server running on port :${PORT}`);
    
})