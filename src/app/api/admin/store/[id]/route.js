import prisma from "@/helper/db"
import { NextResponse } from "next/server"
import {writeFile} from 'fs/promises'

export async function GET(req,{params}){
    try {
        const {id}=params
        const store=await prisma.store.findUnique({
            where:{
                id:id
            }
        })
        if(store){
            return NextResponse.json({
                success:true,
                message:"Successfully obtained detail",
                store:store
            },{
                status:200
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"Not found",
            },{
                status:404
            })
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal Error",
        },{
            status:500
        })
    }
}


export async function POST(req,{params}){
    try {
        const {id}=params
        const formdata=await req.formData()
        const name=formdata.get('name')
        const quantity=parseInt( formdata.get('quantity'))
        const costPrice=parseFloat(formdata.get('costPrice'))
        const sellPrice=parseFloat(formdata.get('sellPrice'))
        const supplierContact=formdata.get('supplierContact')
        const supplierName=formdata.get('supplierName')

     
            let data={
                name,quantity,costPrice,sellPrice,supplierContact,supplierName
            }
            const file=formdata.get('file')
            if(file){
                const byteData=await file.arrayBuffer()
                const buffer=Buffer.from(byteData)
                const path=`./public/store/${file.name}`
                await writeFile(path,buffer)
                data.picture=`/store/${file.name}`
            }
            await prisma.store.update({
                where:{
                    id:id
                },
                data
            })
            return NextResponse.json({
                success:true,
                message:'Successfully edited'
            },{status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:'Internal Error'
        },{status:500})
    }
}

export async function DELETE(req,{params}){
try {
    const {id}=params
    await prisma.store.delete({
        where:{
            id:id
        }
    })
    return NextResponse.json({
        success:true,
        message:'Successfully deleted'
    },{
        status:200
    })
} catch (error) {
    return NextResponse.json({
        success:false,
        message:'Internal Error'
    },{
        status:500
    })
}
}