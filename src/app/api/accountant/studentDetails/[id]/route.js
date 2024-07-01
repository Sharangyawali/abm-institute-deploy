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
        const {streetAddress,city,state,fee,selectedClasses,active,firstName,lastName,email,phone}=await req.json()
        if(!phone||!email||phone===''||email===''){
            return NextResponse.json({
                success:false,
                message:'Provide email and phone'
            },{
                status:301
            })
        }
      const dublicate= await prisma.students.findFirst({
            where:{
                OR:[
                    {phone:phone},
                    {email:email}
                ],
                NOT:[
                    {id:id}
                ]
            }
        })
        if(dublicate){
            return NextResponse.json({
                success:false,
                message:'Email or phone already exist'
            },{
                status:301
            })
        }

        await prisma.students.update({
            where:{
                id:id
            },
            data:{
                streetAddress,city,state,agreedFee:parseFloat(fee),active,firstName,lastName,email,phone
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