import nodemailer from "nodemailer"
let transporter = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
})
export default transporter;