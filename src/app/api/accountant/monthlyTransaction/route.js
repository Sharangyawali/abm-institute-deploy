import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const dynamic='force-dynamic'
export async function GET(req) {
  try {
    // Fetch all transactions
    const transactions = await prisma.transaction.findMany();
    
    // Get the current date and date 6 months ago
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    // Group transactions by month-year within the last 6 months
    const groupedTransactions = transactions.reduce((acc, transaction) => {
      const createdAt = new Date(transaction.createdAt);
      
      // Filter transactions to include only those within the last 6 months
      if (createdAt >= sixMonthsAgo) {
        const month = createdAt.toLocaleString('default', { month: 'long' }); // Extract month name
        if (!acc[month]) {
          acc[month] = {
            month,
            transactions: [],
            gainedAmount: 0,
            lostAmount: 0,
            _count: { amount: 0 },
          };
        }
        acc[month].transactions.push(transaction);
        const amount = Math.abs(parseFloat(transaction.amount)); // Ensure amount is parsed as a float and converted to positive
        if (parseFloat(transaction.amount) > 0) {
          acc[month].gainedAmount += amount;
        } else {
          acc[month].lostAmount += amount;
        }
        acc[month]._count.amount += 1;
      }
      return acc;
    }, {});
    
    // Convert grouped object to an array and sort by date in descending order
    const result = Object.values(groupedTransactions).sort((a, b) => new Date(a.transactions[0].createdAt) - new Date(b.transactions[0].createdAt));

    return NextResponse.json({
      success: true,
      message: "Successfully obtained",
      transactions: result,
    }, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal error",
    }, {
      status: 500,
    });
  }
}
