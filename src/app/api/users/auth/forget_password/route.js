import { User } from "@/models/user";
import { NextResponse } from "next/server";
import { OTPgenerate, otpSTorage, userDataStorage } from "../send_otp/route";
import { sendverifymail } from "@/app/helper/verification_mail";
import { connectDb } from "@/app/helper/db";
import { OTP } from "@/models/otp";
import { sendForgetPasswordMail } from "@/helper/forgetPasswordMail";

connectDb();

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (email) {
      let user = await User.findOne({ email: email });
      if (user) {
        try {
          const name = user.name;
          const role=user.role;
          sendForgetPasswordMail(name,email,role)
          return NextResponse.json(
            {
              success: true,
              message: "Sending OTP...",
              expiry: expiresIn,
            },
            { status: 200 }
          );
        } catch (error) {
          return NextResponse.json(
            {
              success: false,
              message: "Internal Error!!",
            },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Account not found",
          },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Enter an email!!",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Error!!",
      },
      { status: 500 }
    );
  }
}
