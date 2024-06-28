import prisma from "@/helper/db";
import { NextResponse } from "next/server";
import {writeFile} from 'fs/promises'

export const dynamic = "force-dynamic";

export async function GET(){
    try {
        const store=await prisma.store.findMany({
        })
        return NextResponse.json({
            success:true,
            message:'Successfully Obtained',
            store:store,
        },{
            status:200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:'Internal Error'
        },{status:500})
    }
}



export async function POST(req){
    try {
        console.log(req)
        const formdata=await req.formData()
        const name=formdata.get('name')
        const quantity=parseInt( formdata.get('quantity'))
        const costPrice=parseFloat(formdata.get('costPrice'))
        const sellPrice=parseFloat(formdata.get('sellPrice'))
        const supplierContact=formdata.get('supplierContact')
        const supplierName=formdata.get('supplierName')

        if(!name||name===''||!quantity||quantity<=0||!costPrice||costPrice<=0.0||!supplierContact||supplierContact===''||!supplierName||supplierName===''){
            return NextResponse.json({
                success:false,
                message:'Insufficient Information'
            },{
                status:301
            })
        }
        else{
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
            await prisma.store.create({
                data
            })
            return NextResponse.json({
                success:true,
                message:'Successfully added'
            },{status:200})
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:'Internal Error'
        },{status:500})
    }
}