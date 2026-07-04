import { createLogger , format , transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const  { combine , timestamp , json , colorize }  = format ; 


// custom format with console logging with color


const consoleLogFormat = combine(
    colorize(),
    timestamp(),
    format.printf(({ level , message , timestamp }) => {
        return `${timestamp}: ${level}: ${message}`;
    })
);

// rotate logger daily



const transportResponses = new DailyRotateFile({
    filename: "app-%DATE%.log",
    datePattern: "YYYY-MM-DD-HH-mm",
    zippedArchive: false,
    maxSize: "10k",
    maxFiles: "1"
})





// create a winston logger 

const logger = createLogger({
    level: "info" , 
    format: combine( timestamp() , json()),
    transports:[
        new transports.Console({
            format: consoleLogFormat,
        }),

        transportResponses //  for this we don't to create a seprare logger file 
        // new transports.File({filename: "app.logger"})
    ],
});

export default logger