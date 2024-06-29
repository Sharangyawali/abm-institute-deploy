import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const dynamic='force-dynamic'
export async function GET(req) {
  try {
    // Fetch last 3 credited transactions
    const creditedTransactions = await prisma.transaction.findMany({
      where: {
        AND: [
          { amount: { gt: 0 } }, // Only consider positive amounts for credited transactions
        ]
      },
      include: {
        feePayment: {
            include: {
                student: true // Include student relation from transaction
              }
        }, // Include feePayment relation
        salaryPayment: {
            include:{
                teacher:true,
                frontDesk:true,
                accountant:true
            }
        } // Include salaryPayment relation
      },
      orderBy: {
        createdAt: 'desc' // Order by creation date in descending order
      },
      take: 3 // Limit to 3 transactions
    });
    
    // Fetch last 3 debited transactions
    const debitedTransactions = await prisma.transaction.findMany({
      where: {
        AND: [
          { amount: { lt: 0 } }, // Only consider negative amounts for debited transactions
        ]
      },
      include: {
        feePayment: {
            include: {
                student: true // Include student relation from transaction
              }
        }, // Include feePayment relation
        salaryPayment: {
            include:{
                teacher:true,
                frontDesk:true,
                accountant:true
            }
        } // Include salaryPayment relation
      },
      orderBy: {
        createdAt: 'desc' // Order by creation date in descending order
      },
      take: 3 // Limit to 3 transactions
    });

    return NextResponse.json({
      success: true,
      message: "Successfully obtained transactions",
      creditedTransactions,
      debitedTransactions
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal error",
    }, {
      status: 500
    });
  }
}
