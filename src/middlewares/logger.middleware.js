export const createLoggerMiddleware = (prefix,logger) => {
    return (req , res , next) => {
        console.log("Logger middleware hit")
        logger.log(`${prefix} : ${req.method} -> ${req.url}`);
        next();
    };
};