import prisma from "@/helper/db"
import { NextResponse } from "next/server"

export const dynamic="force-dynamic"
export async function GET(req){
    try {
        const students=await prisma.students.findMany({
            include:{
                payments:true
            }
        })
        if(students&&students.length>0){
            return NextResponse.json({
                success:true,
                message:"Students obtained",
                students:students
            },{
                status:200
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"No any students foundr"
            },{
                status:400
            })
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Error"
        },{
            status:500
        })
    }
}