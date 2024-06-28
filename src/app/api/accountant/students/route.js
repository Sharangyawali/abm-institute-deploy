import prisma from "@/helper/db";
import { NextResponse } from "next/server"

export const dynamic="force-dynamic"
export async function GET(req){
try {
    const classesWithStudents = await prisma.classes.findMany({
        include: {
          students: {
            include: {
              student: {
                include:{
                  payments:true
                }
              },
            },
          },
        },
      });
      return NextResponse.json({
        success:true,
        message:"obtained students",
        classesWithStudents:classesWithStudents
      },{status:200})
} catch (error) {
    return NextResponse.json({
        success:false,
        message:"Internal Error"
    },{
        status:500
    })
}
}