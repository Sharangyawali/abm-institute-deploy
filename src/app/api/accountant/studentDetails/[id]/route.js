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
        const {streetAddress,city,state,fee,selectedClasses}=await req.json()
        await prisma.students.update({
            where:{
                id:id
            },
            data:{
<<<<<<< HEAD
                streetAddress,city,state,agreedFee:fee
=======
                streetAddress,city,state,agreedFee:parseFloat(fee)
>>>>>>> 39a21e2 (28th june commited)
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
                    data:{
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
<<<<<<< HEAD
=======
        console.log(error);
>>>>>>> 39a21e2 (28th june commited)
        return NextResponse.json({
            success:false,
            message:'Internal Error'
        },{
            status:500
        })
    }
}