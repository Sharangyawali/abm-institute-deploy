import { NextResponse } from "next/server";
import { sendRequestMail } from "@/helper/request_mail";
import prisma from "@/helper/db";

export async function POST(req) {
  try {
    const { name, phone, email, role } = await req.json();
    if (!name || !phone || !email || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all details",
        },
        {
          status: 400,
        }
      );
    }
    if(role==='Admin'){
      return NextResponse.json(
        {
          success: false,
          message: "Cannot apply for admin",
        },
        {
          status: 401,
        })
    }
    const userDetail = await prisma.User.findFirst({
      where: {
        OR: [{ phone }, { email }],
      },
    });
    if (userDetail) {
      return NextResponse.json(
        {
          success: false,
          message: "Account with the crediantial already exists",
        },
        { status: 409 }
      );
    } else {
      const user=await prisma.User.create({
        data:{
          name,email,phone,role
        }
      })
      sendRequestMail(name, email, role);
      return NextResponse.json(
        {
          success: true,
          message: "Successfully Registered",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        success: false,
        message: JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
