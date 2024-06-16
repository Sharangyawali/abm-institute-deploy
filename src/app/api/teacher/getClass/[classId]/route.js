import prisma from "@/helper/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { classId } = params;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const todaysAttendance = await prisma.attendance.findFirst({
      where: {
        today: formattedDate,
        classId: classId,
      },
    });
    if (todaysAttendance) {
      return NextResponse.json(
        {
          success: true,
          message: "Successfully obtained todays attendance",
          attendance: todaysAttendance,
        },
        {
          status: 200,
        }
      );
    } else {
      const classStudent = await prisma.classStudent.findMany({
        where: {
          classId: classId,
        },
        include: {
          student: true,
          class: {
            include: {
              attendance: true,
            },
          },
        },
      });
      if (classStudent && classStudent.length > 0) {
        return NextResponse.json(
          {
            success: true,
            message: "Successfully obtained class and student",
            classStudent: classStudent,
          },
          {
            status: 200,
          }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Not found",
          },
          {
            status: 400,
          }
        );
      }
    }
  } catch (error) {
    console.log(error);
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
