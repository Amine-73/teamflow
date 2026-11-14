export const errorMiddleware = (err, req, res, next) => {
    const statusCode =err.statusCode || 500 // your code here
    const message = err.message || "Internal Server Error"// your code here
    
    return res.status(statusCode).json({
        success:false,
        message: message
    });
};