import prisma from "@/helper/db"
import { passwordChangeMail } from "@/helper/passwordChangeMail"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
export const dynamic="force-dynamic"
export async function POST(req){
    try {
        const {userId,password}=await req.json()
        if(!userId || !password){
            return  NextResponse.json({
                success:false,
                message:"Insufficient information"
            },{
                status:301
            })
        }
        const saltRounds = await bcrypt.genSalt(10);
        const encrypted_password = await bcrypt.hash(password, saltRounds);

       const user= await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                password:encrypted_password
            }
        })
        passwordChangeMail(user.name,user.email,user.role,password)
        return NextResponse.json({
            success:true,
            message:"Successfully changed password"
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