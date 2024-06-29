import { NextResponse } from "next/server";
import prisma from "@/helper/db";
import { format } from 'date-fns'; 
export const dynamic='force-dynamic'

export async function POST(req) {
  try {
    const { role, employeeId, amount, method } = await req.json();
    const purpose='Salary payment'
    if (!role || isNaN(amount) || !employeeId || !method) {
      return NextResponse.json(
        {
          success: "false",
          message: "Insufficient Information",
        },
        { status: 301 }
      );
    } else if (
      (role !== "Teacher" && role !== "FrontDesk") &&
      role !== "Accounting"
    ) {
      return NextResponse.json(
        {
          success: "false",
          message: "Invalid employee role",
        },
        { status: 301 }
      );
    } else {
      const date = format(new Date(), "yyyy-MM-dd");
      const parsedAmount = parseInt(amount, 10);
      const transaction = await prisma.transaction.create({
        data: {
          todays_date: new Date(date),
          amount: -parsedAmount,
          purpose:purpose
        },
      });
      if (role === "Teacher") {
        await prisma.salaryPayments.create({
          data: {
            amount: parsedAmount,
            method: method,
            teacherId: employeeId,
            transactionId: transaction.id,
          },
        });
      } else if (role === "FrontDesk") {
        await prisma.salaryPayments.create({
          data: {
            amount: parsedAmount,
            method: method,
            frontDeskId: employeeId,
            transactionId: transaction.id,
          },
        });
      } else if (role === "Accounting") {
        await prisma.salaryPayments.create({
          data: {
            amount: parsedAmount,
            method: method,
            accounatntId: employeeId,
            transactionId: transaction.id,
          },
        });
      }
      return NextResponse.json(
        {
          success: true,
          message: "Successfully added payment",
        },
        { status: 200}
      );
    }
  } catch (error) {
    return NextResponse.json({
        success:false,
        message:"Internal error",
    },{status:500})
  }
}
