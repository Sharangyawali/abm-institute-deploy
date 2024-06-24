import prisma from "@/helper/db";
import { NextResponse } from "next/server"
import { format } from 'date-fns'; 

export const dynamic='force-dynamic'
export async function POST(req){
try {
    const { role, user, amount, method,purpose } = await req.json();
    if(!role||!user||!amount||!method||!purpose){
        return NextResponse.json(
            {
              success: "false",
              message: "Insufficient Information",
            },
            { status: 301 }
          );
    }
    else if(role==='Visitor'||role==='Other') {
        const date = format(new Date(), "yyyy-MM-dd");
        const parsedAmount = parseInt(amount, 10);
        const transaction = await prisma.transaction.create({
            data: {
              todays_date: new Date(date),
              amount: parsedAmount,
              purpose:purpose
            },
          });
          if(role==='Visitor'){
            await prisma.creditDetail.create({
                data:{
                    amount:parsedAmount,
                    method:method,
                    transactionId:transaction.id,
                    visitorId:user
                }
            })
          }
          else if(role==='Other'){
            await prisma.creditDetail.create({
                data:{
                    amount:parsedAmount,
                    method:method,
                    transactionId:transaction.id,
                    name:user
                }
            })
          }
          return NextResponse.json(
            {
              success: true,
              message: "Successfully added credit",
            },
            { status: 200}
          );
    }
    else{
        return NextResponse.json(
            {
              success: false,
              message: "Unknown detail",
            },
            { status: 301}
          );   
    }
} catch (error) {
    console.log(error)
    return NextResponse.json({
        success:false,
        message:"Internal error",
    },{status:500})
}
}