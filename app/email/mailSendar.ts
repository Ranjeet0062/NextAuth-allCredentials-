// import nodemailer from "nodemailer"
import transporter from "./createTransport"
export const mailSender = async (email:string, title:string, body:React.ReactNode) => {
    try{
           console.log("inside mail sender and transporter is ",transporter);
            let info = await transporter.sendMail({
                from: 'StudyNotion || CodeHelp - by Babbar',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log("mail send and info is ",info);
            return info;
    }
    catch(error:any) {
        console.error(error.message);
    }
}


