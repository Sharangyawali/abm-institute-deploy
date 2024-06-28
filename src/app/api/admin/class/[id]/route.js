import prisma from "@/helper/db";
import { NextResponse } from "next/server";

export async function POST(req,{params}){
    try {
        const {id}=params
        const {teacherId}=await req.json()
        await prisma.classes.update({
            where:{
                id:id
            },
            data:{
                teachersId:teacherId
            }
        })
        return NextResponse.json({
            success:true,
            message:'Successfully changed teacher'
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:'Internal Error'
        },{status:500})
    }
}