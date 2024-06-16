import prisma from "@/helper/db";
import { NextResponse } from "next/server";
export const dynamic="force-dynamic"
export async function POST(req){
try {
    const{subject,startTime,endTime,teacher}=await req.json()
    if(!subject||!startTime||!endTime||!teacher||startTime==='',endTime===''||teacher===''){
        return  NextResponse.json({
            success:false,
            message:"Insufficient information"
        },{
            status:301
        })
    }
    await prisma.Classes.create({
        data:{
            className:subject,
            startTime:startTime,
            endTime:endTime,
            teachersId:teacher,
        }
    })
    return NextResponse.json({
        success:true,
        message:"Successfully Added class"
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