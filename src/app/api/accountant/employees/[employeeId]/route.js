import prisma from "@/helper/db"
import { NextResponse } from "next/server"

export async function GET(req,{params}){
    try {
        const {employeeId}=params
        const employee=await prisma.user.findUnique({
            where:{
                id:employeeId
            },
            include:{
                teacher:{
                    include:{
                        salary:true
                    }
                },
                accountant:{
                    include:{
                        salary:true
                    }
                },
                frontDesk:{
                    include:{
                        salary:true
                    }
                },

            }
        })
        if(employee){
            return NextResponse.json({
                success:true,
                message:"Successfully obtained student",
                employee:employee
            },{status:200})
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