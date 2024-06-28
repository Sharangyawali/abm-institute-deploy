import { NextResponse } from "next/server";

export async function POST(req){
    const response=NextResponse.json({
        success:true,
        message:'Successfully LogedOut'
    },{
        status:200
    })
    response.cookies.set("authToken","",{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        expires:new Date(0)
      })
      response.cookies.set("role","",{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        expires:new Date(0)
      })
      return response
}