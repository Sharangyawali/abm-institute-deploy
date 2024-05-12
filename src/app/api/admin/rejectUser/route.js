import prisma from "@/helper/db";
import { rejectedMail } from "@/helper/rejectedMail";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const {id}=await req.json()
        if(!id){
            return NextResponse.json({
                success:false,
                message:"Insufficient Information"
            },{
                status:300
            })
        }
        else{
            try {
                const user=await prisma.User.findUnique({
                    where:{
                        id:id
                    }
                })
                if(user){
                    await prisma.User.delete({
                        where:{
                            id:id
                        }
                    })
                    rejectedMail(user.name,user.email,user.role)
                    return NextResponse.json({
                        success:true,
                        message:'Successfully rejected'
                    },{
                        status:200
                    }
                    )
                }
                else{
                    return NextResponse.json({
                        success:false,
                        message:"User not found"
                    },{
                        status:401
                    })
                }
            } catch (error) {
                return NextResponse.json({
                    success:false,
                    message:"Internal Server Error"
                },{
                    status:500
                })
            }

        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Server Error"
        },{
            status:500
        })
    }
}