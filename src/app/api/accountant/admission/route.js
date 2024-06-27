import prisma from "@/helper/db";
import { NextResponse } from "next/server";
export const dynamic='force-dynamic'
export async function POST(req){
    try {
        const {firstName,lastName,streetAddress,city,state,zipCode,phone,email,selectedClasses,fee,gender}=await req.json()
        if(firstName===''||lastName===''||streetAddress===''||city===''||state===''||zipCode===''||phone===''||email===''||!fee||!gender||gender===''){
            return NextResponse.json({
                success:false,
                message:'Insufficient Information'
            },{
                status:301
            })
        }
        const data={firstName,lastName,streetAddress,city,state,zipCode,phone,email,gender,agreedFee:fee}
        const student=await prisma.Students.create({
            data:data
        })
        if(selectedClasses!==null && selectedClasses.length>0){
            const classStudentEntries = selectedClasses.map(classId => ({
                classId: classId,
                studentId: student.id,
              }));
            
              await prisma.ClassStudent.createMany({
                data: classStudentEntries,
              });
        }
        return NextResponse.json({
            success:true,
            message:'Admission successfull'
        },{
            status:200
        })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:'internal Error'
        },{
            status:500
        })
    }
}