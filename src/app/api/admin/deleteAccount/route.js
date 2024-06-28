import prisma from "@/helper/db"
import { NextResponse } from "next/server"
export const dynamic="force-dynamic"

export async function POST(req){
    try {
        const {userId,accountId}=await req.json()
        if(!userId || !accountId){
            return  NextResponse.json({
                success:false,
                message:"Insufficient information"
            },{
                status:301
            })
        }
       const  user=await prisma.user.delete({
        where:{
            id:userId
        }
       })
    //    if(user.role==='FrontDesk'){
    //     await prisma.frontDesks.update({
    //         where:{
    //             id:accountId
    //         },
    //         data:{
    //             deleted:true
    //         }
    //     })
    //    }
    //    else if(user.role==='Accounting'){
    //     await prisma.accountant.update({
    //         where:{
    //             id:accountId
    //         },
    //         data:{
    //             deleted:true
    //         }
    //     })
    //    }
    //    else if(user.role==='Teacher'){
    //     await prisma.teachers.update({
    //         where:{
    //             id:accountId
    //         },
    //         data:{
    //             deleted:true
    //         }
    //     })
    //    }
       return NextResponse.json({
        success:true,
        message:"Successfully Deleted Account"
    },{
        status:200
    })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal error"
        },{
            status:500
        })
    }
}