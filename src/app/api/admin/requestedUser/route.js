import prisma from "@/helper/db";
import { NextResponse } from "next/server";
export async function GET(req){
    try {
        const users=await prisma.User.findMany({
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
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Internal Server Error"
        },{
            status:500
        })
    }
}