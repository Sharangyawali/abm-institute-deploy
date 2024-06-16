import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/helper/db";
export const dynamic='force-dynamic'
export async function GET(){
    try {
        const token=cookies().get('authToken')
        console.log(token.value)
        const key=process.env.AUTH_TOKEN
        const data=jwt.verify(token.value,key)
        const user=await prisma.user.findUnique({
            where:{
                id:data.id
            },
            include:{
                teacher:{
                    include:{
                        class:{
                            include:{
                                _count:{
                                    select:{
                                        students:true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        return NextResponse.json({
            success:true,
            message:"Successfully obtained details",
            detail:user
        },{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Internal Error"
        },{status:500})
    }
}