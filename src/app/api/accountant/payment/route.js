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

      const transactions = await prisma.transaction.findMany();
    // Group transactions by month
    const groupedByMonth = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.todays_date).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!acc[month]) {
        acc[month] = {
          month,
          transactions: [],
          total_amount: 0,
          count: 0,
        };
      }
      acc[month].transactions.push(transaction);
      acc[month].total_amount += Number(transaction.amount);
      acc[month].count += 1;
      return acc;
    }, {});

    const resultByMonth = Object.values(groupedByMonth).sort((a, b) => new Date(b.month) - new Date(a.month));

    // Group transactions by week
    const groupedByWeek = transactions.reduce((acc, transaction) => {
      const currentDate = new Date(transaction.todays_date);
      const weekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      const weekLabel = `${weekStart.toISOString().split('T')[0]} to ${weekEnd.toISOString().split('T')[0]}`;
      
      if (!acc[weekLabel]) {
        acc[weekLabel] = {
          week: weekLabel,
          transactions: [],
          total_amount: 0,
          count: 0,
        };
      }
      acc[weekLabel].transactions.push(transaction);
      acc[weekLabel].total_amount += Number(transaction.amount);
      acc[weekLabel].count += 1;
      return acc;
    }, {});

    const resultByWeek = Object.values(groupedByWeek).sort((a, b) => new Date(b.week.split(' to ')[0]) - new Date(a.week.split(' to ')[0]));

      return NextResponse.json({
        success:true,
        message:"Successfully obtained",
        transactions:result,
        monthly:resultByMonth,
        weekly:resultByWeek
      },{
        status:200
      })
} catch (error) {
    return NextResponse.json({
        success:false,
        message:"Internal error",
    },{status:500})
}
}