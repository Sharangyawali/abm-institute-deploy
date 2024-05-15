import prisma from "@/helper/db";
import { NextResponse } from "next/server";
export async function POST(req){
    try {
        const {firstName,lastName,streetAddress,city,state,zipCode,phone,email,purpose,gender}=await req.json()
        if(!firstName||!lastName||!streetAddress||!city||!state||!zipCode||!phone||!email||!purpose||!gender){
            return NextResponse.json({
                success:false,
                message:"Insufficient Information"
            },{status:300})
        }
        else{
            const visitor=await prisma.Visitors.findUnique({
                where:{
                    phone:phone
                }
            })
            const time=new Date()
            if(visitor){
                const visitorUpdate=await prisma.Visitors.update({
                    where:{
                        phone:phone
                    },
                    data:{
                        firstName,lastName,streetAddress,city,state,zipCode,email,gender,
                        history:{
                            push:{
                                    time:time,
                                    purpose:purpose
                            },
                        }
                    }
                })
                const visits=await prisma.Visits.create({
                    data:{
                        firstName,lastName,phone,visitTime:time,visitorId:visitorUpdate.id,purpose

                    }
                })
            }
            else{
                const newVisitor=await prisma.Visitors.create({
                    data:{
                        firstName,lastName,streetAddress,city,state,zipCode,phone,email,gender,
                        history:[{time:time,purpose:purpose}]

                    }
                })
                const visits=await prisma.Visits.create({
                    data:{
                        firstName,lastName,phone,visitTime:time,visitorId:newVisitor.id,purpose
                    }
                })
            }
            return NextResponse.json({
                success:true,
                message:"Successfully added new visitor"
            },{status:200})
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Error"
        },{status:500})
    }
}