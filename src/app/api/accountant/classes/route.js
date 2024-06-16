import prisma from "@/helper/db";
import { NextResponse } from "next/server";
export const dynamic="force-dynamic"
export async function GET(req){
    try {
        const classes=await prisma.classes.findMany({
            include: {
                teacher: {
                  select: {
                    name: true,
                  },
                },
                _count:{
                    select:{
                        students:true,
                    }
                }
              },
        })
        return NextResponse.json({
            success:true,
            message:"Successfully obtained classes",
            classes:classes
        },{status:200})
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