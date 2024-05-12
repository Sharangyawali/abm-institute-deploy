// import bcrypt from 'bcrypt'
// import prisma from "@/helper/db";
// import { NextResponse } from 'next/server';

// export async function POST(req){
//     try {
//             const name='ABMINSTITUTE'
//     const phone="9861596887"
//     const email='sharangyawali@gmail.com'
//     const password='R@ND0MG3N3R@t3'
//     const role="Admin"
//     const saltRounds = await bcrypt.genSalt(10);
//     const encrypted_password = await bcrypt.hash(password, saltRounds);
//     console.log(encrypted_password)
//     const user=await prisma.User.create({
//         data:{
//             name,phone,email,password:encrypted_password,role,isverified:true
//         }
//     })
//     console.log(user)
//     NextResponse.json({
//         success:true
//     },{status:200})
//     } catch (error) {
//         console.log(error)
//         NextResponse.json({
//             success:false
//         },{status:500})
//     }
// }