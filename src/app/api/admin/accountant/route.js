import prisma from "@/helper/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req){
    try {
        const accountant=await prisma.accountant.findMany({
            where:{
                OR:[
                    {deleted:false},
                    {deleted:null}
                  ]
            },
            include:{
                user:true
            }
        })
        
        return NextResponse.json({
            success:true,
            message:"Successfully obtained frontDesk",
            accountant:accountant
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Server Error"
        },{
            status:500
        })
    }
}