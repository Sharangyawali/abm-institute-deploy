import prisma from "@/helper/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req){
    try {
        const users=await prisma.user.findMany({
        where:{
            isverified:false
        } ,
        orderBy:{
            createdAt:"desc"
        }   
        })
       return NextResponse.json({
            success:true,
            message:"Successfully obtained users",
            users:users
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Server Error"
        },{
            status:500
        })
    }
}