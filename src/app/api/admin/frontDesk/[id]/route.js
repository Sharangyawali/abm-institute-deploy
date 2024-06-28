import prisma from "@/helper/db"
import { NextResponse } from "next/server"

export async function GET(req,{params}){
    try {
        const {id}=params
        const frontDesk=await prisma.frontDesks.findUnique({
            where:{
                id:id
            },
            include:{
                user:true
            }
        })
        if(frontDesk){
            return NextResponse.json({
                success:true,
                message:"Successfully obtained detail",
                frontDesk:frontDesk
            },{
                status:200
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"Internal Error",
            },{
                status:500
            })
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Not found",
        },{
            status:404
        })
    }
}