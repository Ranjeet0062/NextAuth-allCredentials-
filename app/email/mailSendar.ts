import nodemailer from "nodemailer"
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function mailSender(email:string,username:string,verifyCode:string) {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'dev@hiteshchoudhary.com',
//       to: email,
//       subject: 'verification of email',
//       react: EmailTemplate({ username,otp:verifyCode}),
//     });
//     console.log(data,"and error is ",error)
//     return { success: true, message: 'Verification email sent successfully.' };
//   } catch (error) {
//     console.error('Error sending verification email:', error);
//     return { success: false, message: 'Failed to send verification email.' };
//   }
// }
export const mailSender = async (email:string,body:React.ReactNode) => {
  try{
          let transporter = nodemailer.createTransport({
              host:process.env.MAIL_HOST,
              port:587,
              secure: false,
              auth:{
                  user: process.env.MAIL_USER,
                  pass: process.env.MAIL_PASS,
              }
          })
          let info = await transporter.sendMail({
              from: 'NextAuth || verification',
              to:`${email}`,
              subject: `Email verifation.`,
              html: `${body}`,
          })
          console.log(info);
          // return info;
          return {success:true,message:"otp eamil sent sucessfully"}
  }
  catch(error:any) {
      console.log(error.message);
      return {success:false,message:"email sending failed"}
  }
}
