// import { User } from "@/models/user";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { connectDb } from "@/helper/db";
// import { verifyResetToken } from "@/helper/verifyToken";

// const bcrypt = require("bcrypt");
// // connectDb();

// const jwt=require("jsonwebtoken");

// export async function POST(req) {
//   try {
//     const {resetToken} = req.query
//     const {data}=verifyResetToken(resetToken);
//     if (data) {
//       try {
//         const id=data._id
//         const { password } = await req.json();
//         if (password) {
//           const saltHash =await bcrypt.genSalt(10);
//           const encrypted_password =await bcrypt.hash(password, saltHash);
//           try {
//             const passEdit = await User.updateOne(
//               { _id: id },
//               { $set: { password: encrypted_password } }
//             );
//             return NextResponse.json(
//               {
//                 success: true,
//                 message: "Successfully updated password!",
//               },
//               { status: 200 }
//             );
//           } catch (error) {
//             return NextResponse.json(
//               {
//                 success: false,
//                 message: "Internal Error!!",
//               },
//               { status: 500 }
//             );
//           }
//         } else {
//           return NextResponse.json(
//             {
//               success: false,
//               message: "Invalid password field",
//             },
//             { status: 40 }
//           );
//         }
//       } catch (error) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "Token Error!!",
//           },
//           { status: 500 }
//         );
//       }
//     } else {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid Request",
//         },
//         { status: 403 }
//       );
//     }
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal Error!!",
//       },
//       { status: 500 }
//     );
//   }
// }
