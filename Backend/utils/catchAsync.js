const catchAsync = (fn) => {
    return (req,res,next)=>{
        fn(req,res,next).catch(next) //passes error to the global handler
    }
}

export default catchAsync