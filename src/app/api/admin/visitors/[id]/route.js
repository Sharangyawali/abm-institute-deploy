import prisma from "@/helper/db"
import { NextResponse } from "next/server"

export async function GET(req,{params}){
    try {
        const {id}=params
        let visitor=await prisma.visitors.findUnique({
            where:{
                id:id
            },
            include:{
                visit:true,
                credits:true,
                debits:true
            }
        })
        if(visitor){
            const combinedTransactions = [
                ...visitor.credits.map(credit => ({ ...credit, type: 'credit' })),
                ...visitor.debits.map(debit => ({ ...debit, type: 'debit' })),
              ];
              combinedTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              visitor={...visitor,transaction:combinedTransactions}
            return NextResponse.json({
                success:true,
                message:"Successfully obtained detail",
                visitor:visitor
            },{
                status:200
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"Not found",
            },{
                status:404
            })
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Error",
        },{
            status:500
        })
    }
}