const errorMiddleware = (err,req,res,next) => {
        err.statusCode = err.statusCode || 500
        err.status = err.status || 'error'

        return res.status(err.statusCode).json({
            success: false,
            status : err.status ,
            message : err.message,
            stack : process.env.NODE_ENV === 'DEV'  ? err.stack : undefined
        })
}

export default errorMiddleware