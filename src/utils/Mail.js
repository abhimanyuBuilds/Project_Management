import Mailgen from "mailgen"
import nodemailer from "nodemailer"




export const  sendEmail = async (options) => {
    const mailGenerator = new Mailgen ({
        theme: "Default",
        product:{
            name: "Task Manager",
            link: "http://taskmanagelink.com"
        }
    })
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth:{
            user: process.env.MAILTRAP_SMTP_USERNAME ,
            pass: process.env.MAILTRAP_SMTP_PASSWORD ,
        }
    })

    const mail = {
        from : " ",
        to: options ,
        subject: options.subject , 
        text: emailTextual , 
        html: emailHtml 
    }


    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed. Make sure that you have provided your mailTrap credentials in the .env ")
        console.error("Error", error)        
    }
}

const emailVerfificationMailgenContent = (userName, verificationUrl) => {
    return {
        body: {
            name: userName,
            intro: 'Welcome to our App! We\'re very excited to have you on board.',
            action: {
                instructions: 'To verify your email, please click here:',
                button: {
                    color: '#2255bc', // Optional action button color
                    text: 'Confirm your account',
                    link: verificationUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
};



const forgotPasswordVerificationMailgenContent = ( userName , passworResetdUrl) => {
    return {
        body:{
        name: userName,
        intro: 'We got a request to reset the password of your account:',
        action: {
            instructions: 'To reset the password click on the following button or link ',
            button: {
                color: '#bc5022', // Optional action button color
                text: 'Reset Password',
                link: passworResetdUrl,
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}

export  {emailVerfificationMailgenContent , forgotPasswordVerificationMailgenContent}