import prisma from "@/helper/db";
import generateToken from "@/helper/generateToken";
import { NextResponse } from "next/server";

const bcrypt = require("bcrypt");


export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (email && password) {
      let user = await prisma.user.findFirst({ 
        where:{
          email:email,
          OR:[
            {deleted:false},
            {deleted:null}
          ]
        }
       });
       console.log(user)
      if (user) {
        if(user.isverified===false){
          return NextResponse.json({
            success:false,
            message:"You are not verified yet!"
          },{
            status:403
          })
        }
        let hashed_password = user.password;
        let matched = await bcrypt.compare(password, hashed_password);
        if (matched === true) {
          const authToken=await generateToken(user)
          const role=user.role
          const response=NextResponse.json({
            success: true,
            message: "Login Successfull!!",
            role: role,
          },{status:200})
          response.cookies.set("authToken",authToken,{
            httpOnly:true,
            secure:true,
            sameSite:'strict',
            expires:new Date(Date.now()+30*24*60*60*1000)
          })
          response.cookies.set("role",role,{
            httpOnly:true,
            secure:true,
            sameSite:'strict',
            expires:new Date(Date.now()+30*24*60*60*1000)
          })
          return response
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "Enter a valid details!!",
            },
            { status: 401 }
          );
        }
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Enter a valid details!!",
          },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Enter a valid details!!",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal Error!!",
      },
      { status: 500 }
    );
  }
}
