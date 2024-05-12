import prisma from "@/helper/db";
import { NextResponse } from "next/server";
export async function GET(req,{params}){
    try {
        const{visitorId}=params;
        const visitor=await prisma.Visitors.findUnique({
            where:{
                id:visitorId
            }
        })
        return NextResponse.json({
            success:true,
            message:"Successfully obtained visitor",
            visitor:visitor
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"internal Error"
        },{
            status:500
        })
    }
}