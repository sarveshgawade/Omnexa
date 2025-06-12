import {Quote} from "../models/model.index.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

const addQuote = catchAsync(async (req,res,next) => {
    const {} = req.body

        console.log('haha');
        
})

export {addQuote}