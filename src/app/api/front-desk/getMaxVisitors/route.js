import prisma from "@/helper/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(){
try {
    const maxCountVisitors = await prisma.Visits.groupBy({
      by: ['phone'],
      _count: {
        phone: true // Ordering by count in descending order
      },
      orderBy:{
        _count:{
          phone:'desc'
        }
      },
      take:3
    })
    const visitorsInfo = await Promise.all(maxCountVisitors.map(async (group) => {
      const { phone } = group;
      const { firstName, lastName } = await prisma.Visitors.findUnique({
        where: {
          phone
        },
        select: {
          firstName: true,
          lastName: true
        }
      });
      return {
        phone,
        count: group.count,
        firstName,
        lastName
      };
    }));
    return NextResponse.json({
        success:true,
        message:"Successfully obtained visitors",
        visitors:visitorsInfo
    },{
        status:200
    })
} catch (error) {
  console.log(error)
    return NextResponse.json({
        success:false,
        message:"Internal Error"
    },{status:500})
}
}