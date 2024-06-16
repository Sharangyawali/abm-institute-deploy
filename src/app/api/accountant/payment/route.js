import prisma from "@/helper/db";
import { NextResponse } from "next/server";
import { format } from 'date-fns'; 

export const dynamic='force-dynamic'

export async function POST(req) {
    try {
        const { studentID, amount, method } = await req.json();
      const purpose="Students fee payment"
        if (!studentID || isNaN(amount) || !method) {
            return NextResponse.json({
                success: false,
                message: 'Insufficient Information'
            }, { status: 301 });
        } else {
            const date = format(new Date(), 'yyyy-MM-dd');
            const parsedAmount = parseInt(amount, 10);

            // Create the transaction
            const transaction = await prisma.transaction.create({
                data: {
                    todays_date: new Date(date),
                    amount: parsedAmount,
                    purpose:purpose
                }
            });

            // Create the fee payment
            await prisma.feePayments.create({
                data: {
                    amount: parsedAmount,
                    method: method,
                    studentId: studentID,
                    transactionId: transaction.id
                }
            });

            await prisma.$disconnect(); // Ensure the Prisma client is disconnected after the operations

            return NextResponse.json({
                success: true,
                message: 'Successfully added fee payment'
            }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        await prisma.$disconnect(); // Ensure the Prisma client is disconnected in case of an error

        return NextResponse.json({
            success: false,
            message: 'Internal Error'
        }, { status: 500 });
    }
}

export async function GET(req){
try {
    const groupedTransactions = await prisma.transaction.groupBy({
        by: ['todays_date'],
        _sum: {
          amount: true,
        },
        _count: {
          amount: true,
        },
        orderBy: {
          todays_date: 'desc', // Optional: Order the results by todays_date
        },
      });
    
      const result = [];
    
      for (const group of groupedTransactions) {
        const { todays_date } = group;
        const transactions = await prisma.transaction.findMany({
          where: {
            todays_date,
          },
        });
        result.push({
          ...group,
          transactions,
        });
      }
      return NextResponse.json({
        success:true,
        message:"Successfully obtained",
        transactions:result
      },{
        status:200
      })
} catch (error) {
    console.log(error)
    return NextResponse.json({
        success:false,
        message:"Internal error",
    },{status:500})
}
}