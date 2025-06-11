import AppError from "../utils/AppError.js";

const validateRequest = (schema) => {
    return (req,res,next) => {
        const {error} = schema.validate(req.body)
        
        if(error){
            return next(new AppError(400,error.details[0].message))
        }

        next()
    }
}

export default validateRequest