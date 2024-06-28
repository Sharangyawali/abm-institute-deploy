import prisma from "@/helper/db";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    try {
        const {studentId}=params
        const student=await prisma.students.findUnique({
            where:{
                id:studentId
            },
            include:{
                payments:true,
                classes:{
                    include:{
                        class:{
                            include:{
                                attendance:true
                            }
                        }
                    }
                }
            }
        })
        if(student){
            return NextResponse.json({
                success:true,
                message:"Successfully obtained student",
                student:student
            },{
                status:200
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"Not found"
            },{
                status:400
            })
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"internal Error"
        },{
            status:500
        })
    }
}