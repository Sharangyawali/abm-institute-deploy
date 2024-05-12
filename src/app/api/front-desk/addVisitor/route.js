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
            if(visitor){
                const visitorUpdate=await prisma.Visitors.update({
                    where:{
                        phone:phone
                    },
                    data:{
                        firstName,lastName,streetAddress,city,state,zipCode,email,purpose,gender,
                        history:{
                            push:new Date(),
                        }
                    }
                })
                const visits=await prisma.Visits.create({
                    firstName,lastName,phone,visitTime:new Date(),visitorId:visitorUpdate.id
                })
            }
            else{
                const newVisitor=await prisma.Visitors.create({
                    firstName,lastName,streetAddress,city,state,zipCode,phone,email,purpose,gender,
                    history:[new Date()]
                })
                const visits=await prisma.Visits.create({
                    firstName,lastName,phone,visitTime:new Date(),visitorId:newVisitor.id
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