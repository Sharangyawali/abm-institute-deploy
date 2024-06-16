import prisma from "@/helper/db";
import { NextResponse } from "next/server"

export async function POST(req){
try {
    const {classId,record,attendanceId}=await req.json()
    console.log(classId)
    console.log(record)
    console.log(attendanceId)
    if(!classId||!record){
        return NextResponse.json({
            success:false,
            message:"Not enough detail"
        },{status:301})
    }
    else{
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        if(attendanceId!==''){
            try {
                await prisma.attendance.update({
                    where:{
                        id:attendanceId,
                        today:formattedDate,
                        classId:classId
                    },
                    data:{
                        record:record
                    }
                })
            } catch (error) {
                if(error.code==='P2025'){
                    await prisma.attendance.create({
                        data:{
                            classId:classId,
                            record:record,
                            today:formattedDate
                        }
                    })
                }
                else{
                    throw error
                }
            }
        }
        else{
            await prisma.attendance.create({
                data:{
                    classId:classId,
                    record:record,
                    today:formattedDate
                }
            })
        }
        return NextResponse.json({
            success:true,
            message:"Successfully done todays attendance"
        },{status:200})
    }
} catch (error) {
    console.log(error)
    return NextResponse.json({
        success:false,
        message:"internal Error"
    },{
        status:500
    })
}
}