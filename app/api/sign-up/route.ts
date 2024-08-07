import { PrismaClient } from "@prisma/client";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import {mailSender} from "../../email/mailSendar"
import  EmailTemplate  from '../../email/verificationEmailTemplete';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    const existingVerifiedUserByUsername = await prisma.user.findFirst({
      where: {
        username,
        isVerified: true,
      },
    });
    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 200 }
      );
    }
    const existngUserByEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const verifyCode = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    if (existngUserByEmail) {
      if (existngUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 200 }
        );
      } else {
        await prisma.user.update({
          where: { email },
          data: {
            password: hashedPassword,
            verificationCode: verifyCode,
            verifyCodeExpiry: new Date(Date.now() + 3600000), // 1 hour from now
          },
        });
      }
    } else {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          verificationCode: verifyCode, // Example verification code
          verifyCodeExpiry: expiryDate, // 1 hour from now
          isVerified: false, // Assuming new users are not verified initially
        },
      });
    }
    const sendEmailResponse=await mailSender(email,EmailTemplate({username,otp:verifyCode.toString()}));
    console.log("sendEmailResponse",sendEmailResponse)
    if(!sendEmailResponse.success){
      return Response.json(
        {
          success: false,
          message: "User registered failed. Please try again.",
        },
        { status: 401 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "signup-failed. please try again",
      },
      { status: 201 }
    );
  }
}
