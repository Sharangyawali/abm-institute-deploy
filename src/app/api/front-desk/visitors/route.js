import prisma from "@/helper/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(){
    try {
        const visitors=await prisma.Visitors.findMany()
        return NextResponse.json({
            success:true,
            message:"Successfully obtained visitors",
            visitors:visitors
        },{
            status:200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Internal error"
        },{
            status:500
        })
    }
}