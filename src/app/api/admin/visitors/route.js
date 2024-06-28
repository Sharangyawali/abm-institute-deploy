import { NextResponse } from "next/server";
import prisma from "@/helper/db";
export const dynamic = "force-dynamic";
export async function GET(req){
try {
    const visitors=await prisma.visitors.findMany({})
    return NextResponse.json({
        success:true,
        message:"Successfully obtained students",
        visitors:visitors
    },{status:200})
} catch (error) {
    return NextResponse.json({
        success:false,
        message:"Internal Server Error"
    },{
        status:500
    })
}
}