import prisma from "@/helper/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req){
    try {
        const users=await prisma.user.findMany({
            where:{
                role:{
                    not:'Admin'
                },
                OR:[
                    {deleted:false},
                    {deleted:null}
                  ]
            },
        orderBy:{
            createdAt:"desc"
        },
        include:{
            teacher:{
                include:{
                    salary:true
                }
            },
            frontDesk:{
                include:{
                    salary:true
                }
            },
            accountant:{
                include:{
                    salary:true
                }
            },
        } 
        })
       return NextResponse.json({
            success:true,
            message:"Successfully obtained users",
            users:users
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Server Error"
        },{
            status:500
        })
    }
}