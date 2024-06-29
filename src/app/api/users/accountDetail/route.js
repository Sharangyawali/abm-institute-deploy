import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/helper/db";
import {writeFile} from 'fs/promises'
export const dynamic='force-dynamic'
export async function GET(){
    try {
        const token=cookies().get('authToken')
        const key=process.env.AUTH_TOKEN
        const data=jwt.verify(token.value,key)
        const user=await prisma.user.findUnique({
            where:{
                id:data.id
            },
            include:{
                teacher:true,
                accountant:true,
                frontDesk:true
            }
        })
        if(user){
            return NextResponse.json({
                success:true,
                message:"Successfully obtained details",
                detail:user
            },{status:200})
        }
        else{
            const response=NextResponse.json({
                success:false,
                message:'Unauthorized Access'
            },{
                status:403
            })
            response.cookies.set("authToken","",{
                httpOnly:true,
                secure:true,
                sameSite:'strict',
                expires:new Date(0)
              })
              response.cookies.set("role","",{
                httpOnly:true,
                secure:true,
                sameSite:'strict',
                expires:new Date(0)
              })
              return response
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Error"
        },{status:500})
    }
}

export async function POST(req){
    try {
        const formdata=await req.formData()
        const streetAddress=formdata.get('streetAddress')
        const city=formdata.get('city')
        const state=formdata.get('state')
        const gender=formdata.get('gender')
        const token=cookies().get('authToken')
        const key=process.env.AUTH_TOKEN
        const data=jwt.verify(token.value,key)
        let update={
            streetAddress:streetAddress,city:city,state:state,gender:gender
        }
        if(data && data.id &&data.role){
            const file=formdata.get('file')
            if(file){
                const byteData=await file.arrayBuffer()
                const buffer=Buffer.from(byteData)
                const path=`./public/${file.name}`
                await writeFile(path,buffer)
                update.profilePic=`/${file.name}`
            }
            try {
                if(data.role==='Teacher'){
                    await prisma.user.update({
                        where:{
                            id:data.id
                        },
                        data:{
                            teacher:{
                           update
                            }
                        }
                    })
                }
                else if(data.role==='FrontDesk'){
                    await prisma.user.update({
                        where:{
                            id:data.id
                        },
                        data:{
                            frontDesk:{
                            update
                            }
                        }
                    })
                }
               else if(data.role==='Accounting'){
                    await prisma.user.update({
                        where:{
                            id:data.id
                        },
                        data:{
                            accountant:{
                            update
                            }
                        }
                    })
                }
                return NextResponse.json({
                    success:true,
                    message:"Successfully updated"
                },{
                    status:200
                })
                
            } catch (error) {
                const response= NextResponse.json({
                    success:false,
                    message:'Account not found'
                },{status:404})
                response.cookies.set("authToken","",{
                    httpOnly:true,
                    secure:true,
                    sameSite:'strict',
                    expires:new Date(0)
                  })
                  response.cookies.set("role","",{
                    httpOnly:true,
                    secure:true,
                    sameSite:'strict',
                    expires:new Date(0)
                  })
                  return response
            }
        }
        else{
            return NextResponse.json({
                success:false,
                message:"Token not valid"
            },{status:403})
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Error"
        },{status:500})
    }
}