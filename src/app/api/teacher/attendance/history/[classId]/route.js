import prisma from "@/helper/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { classId } = params;
    const attendance = await prisma.attendance.findMany({
      where: {
        classId: classId,
      },
      include: {
        class: {
          include:{
            teacher:true
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Successfully obtained attendance",
        attendance: attendance,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "internal Error",
      },
      {
        status: 500,
      }
    );
  }
}
