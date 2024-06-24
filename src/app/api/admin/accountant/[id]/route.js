import prisma from "@/helper/db"
import { NextResponse } from "next/server"

export async function GET(req,{params}){
    try {
        const {id}=params
        const accountant=await prisma.accountant.findUnique({
            where:{
                id:id
            },
            include:{
                user:true
            }
        })
        if(accountant){
            return NextResponse.json({
                success:true,
                message:"Successfully obtained detail",
                accountant:accountant
            },{
                status:200
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"Not found",
            },{
                status:404
            })
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Error",
        },{
            status:500
        })
    }
}