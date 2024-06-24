import prisma from "@/helper/db";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
try {
    const {visitorId}=params
    let visitor=await prisma.visitors.findUnique({
        where:{
            id:visitorId
        },
        include:{
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
            message:'Successfully Obtained Detail',
            visitor:visitor
        },{
            status:200
        })
    }
    else{
        return NextResponse.json({
            success:false,
            message:'Visitor not found'
        },{
            status:400
        })
    }

} catch (error) {
    return NextResponse.json({
        success:false,
        message:'Internal Error'
    },{
        status:500
    })
}
}