import { createLogger , format , transports } from "winston";
const  { combine , timestamp , json , colorize }  = format ; 


// custom format with console logging with color


const consoleLogFormat = format.colorize(
    format.colorize(),
    format.printf(({ level , message , timestamp }) => {
        return `${level}: ${timestamp}: ${message}`;
    })
);

// create a winston logger 

const logger = createLogger({
    level: "info" , 
    format: combine(colorize() , timestamp() , json()),
    transports:[
        new transports.Console({
            format: consoleLogFormat,
        }),
        new transports.File({filename: "app.logger"})
    ],
});

export default logger