import prisma from "@/helper/db"
import { NextResponse } from "next/server"

export async function GET(req,{params}){
    try {
        const {id}=params
        const student=await prisma.students.findUnique({
            where:{
                id:id
            },
            include:{
                classes:{
                    include:{
                        class:true
                    }
                },
                payments:true
            }
        })
        if(student){
            return NextResponse.json({
                success:true,
                message:"Successfully obtained detail",
                student:student
            },{
                status:200
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"Not found",
            },{
                status:404
            })
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Error",
        },{
            status:500
        })
    }
}

export async function POST(req,{params}){
    try {
        const {id}=params
        const {streetAddress,city,state,fee,selectedClasses,active}=await req.json()
        await prisma.students.update({
            where:{
                id:id
            },
            data:{
                streetAddress,city,state,agreedFee:parseFloat(fee),active
            }
        })
        if(selectedClasses!==null && selectedClasses.length>0){
             selectedClasses.forEach(async(classId) => {
                await prisma.classStudent.upsert({
                    where: {
                        // Creating a unique identifier for the composite key
                        classId_studentId: {
                          classId: classId,
                          studentId: id,
                        },
                      },
                    update:{
                    },
                    create:{
                        classId:classId,
                        studentId:id
                    }
                
                })
             });
        }
        return NextResponse.json({
            success:true,
            message:'Successfully Updated'
        },{
            status:200
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:'Internal Error'
        },{
            status:500
        })
    }
}