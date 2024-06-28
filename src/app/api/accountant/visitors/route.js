import prisma from "@/helper/db"
import { NextResponse } from "next/server"

export const dynamic='force-dynamic'
export async function GET(req){
try {
    const visitors=await prisma.visitors.findMany({})
    return NextResponse.json({
        success:true,
        message:'Successfully obtained visitors',
        visitors:visitors
    },{
        status:200
    })
} catch (error) {
    return NextResponse.json({
        success:false,
        message:"Internal Error"
    },{status:500})
}
}