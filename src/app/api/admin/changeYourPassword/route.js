import prisma from "@/helper/db"
import { passwordChangeMail } from "@/helper/passwordChangeMail"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
export const dynamic="force-dynamic"
export async function POST(req){
    try {
        const {password}=await req.json()
        const token=cookies().get('authToken')
        const key=process.env.AUTH_TOKEN
        const data=jwt.verify(token.value,key)
        if(data&&data.id){
            if(!password||password.length<6){
                return NextResponse.json({
                    success:false,
                    message:'Password must be at least 6 characters long'
                },{
                    status:301
                })
            }
            else{
                const saltRounds = await bcrypt.genSalt(10);
                const encrypted_password = await bcrypt.hash(password, saltRounds);        
             const admin=await prisma.user.update({
                    where:{
                        id:data.id
                    },
                    data:{
                        password:encrypted_password
                    }
                })
                passwordChangeMail(admin.name,admin.email,'Admin',password)

                return NextResponse.json({
                    success:true,
                    message:"Successfully changed password"
                },{
                    status:200
                })
            }
        }
        else{
            return NextResponse.json({
                success:false,
                message:'Unauthorized access'
            },{
                status:401
            })
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Error"
        },{
            status:500
        })
    }
}