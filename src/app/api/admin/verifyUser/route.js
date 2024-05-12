import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import { userVerifiedMail } from "@/helper/userVerifiedMail";
import prisma from "@/helper/db";

export async function POST(req){
    try {
        const {id,password}=await req.json()
        if(!id||password.length<6){
            return NextResponse.json({
                success:false,
                message:"Insufficient information"
            },{
                status:300
            })
        } 
        else{
            try {
                const saltRounds = await bcrypt.genSalt(10);
                const encrypted_password = await bcrypt.hash(password, saltRounds);
                const user=await prisma.User.findUnique({
                    where:{
                        id:id
                    }
                })
                if(user){
                    await prisma.User.update({
                        where:{
                            id:id
                        },
                        data:{
                            isverified:true,
                            password:encrypted_password
                        }
                    })
                    userVerifiedMail(user.name,user.email,user.role,password)
                    return NextResponse.json({
                        success:true,
                        message:"Successfully verified user"
                    },{
                        status:200
                    })
                }
                else{
                    return NextResponse.json({
                        success:false,
                        message:'User not found'
                    },{
                        status:403
                    })
                }
            } catch (error) {
                return NextResponse.json({
                    success:false,
                    message:error
                },{
                    status:500
                })
            }
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Server Error"
        },{
            status:500
        })
    }
}