export const createLogger = () => {
    return {
        log: (message) => {
            console.log(`[LOG] ${new Date().toISOString()} - ${message}`)
        },
        error: (message) => {
            console.log(`[ERROR] ${new Date().toISOString()} - ${message}`)
        },
        info: (message) => {
            console.log(`[INFO] ${new Date().toISOString()} - ${message}`)
        },
        warn: (message) => {
            console.log(`[WARN] ${new Date().toISOString()} - ${message}`)
        }
    };

};