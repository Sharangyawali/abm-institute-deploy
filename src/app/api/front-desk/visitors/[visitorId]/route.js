import { connectDb } from "@/helper/db";
import { Visitors } from "@/models/uniqueVisitors";
import { NextResponse } from "next/server";
connectDb()
export async function GET(req,{params}){
    try {
        const{visitorId}=params;
        const visitor=await Visitors.findById(visitorId)
        return NextResponse.json({
            success:true,
            message:"Successfully obtained visitor",
            visitor:visitor
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"internal Error"
        },{
            status:500
        })
    }
}