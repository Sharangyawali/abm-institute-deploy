"use client"
import { CircularProgress } from "@mui/joy";
import Link from "next/link";
import React,{useState,useEffect} from "react";
import toast from "react-hot-toast";

const page = ({ params }) => {
    const [loading,setLoading]=useState(true)
    const[detail,setDetail]=useState({})
    useEffect(()=>{
        getDetail()
    },[])

    const getDetail=async()=>{
        let result=await fetch(`/api/admin/getTeachers/${params.id}`,{
            method:'get'
        })
        result=await result.json()
        setLoading(false)
        if(result.success===false){
            toast.error(result.message)
        }
        else{
            setDetail(result.teacher)
        }
    }
  return (
    <div className="w-[100%] flex justify-center items-center">
    {loading?<CircularProgress/>:
    
  <div className="w-[100%] tablet:w-[80%] flex flex-col laptop:flex-row justify-between items-center">
    <div className="w-[100%] laptop:w-[39%] flex flex-col justify-center items-center gap-[20px] h-[200px] laptop:h-[600px] shadow-xl rounded-md bg-gradient-to-r from-[#f06273] to-[#f0936a] text-white font-bold text-[18px]">
      <div className="h-[80px] w-[80px] rounded-full bg-white">
        <img src={`${detail.profilePic?detail.profilePic:detail.gender==='Male'?'/profile-demo.jpg':'/female.png'}`} className="h-[100%] w-[100%] rounded-full" />
      </div>
      <span>{detail.name}</span>
      <span>Teacher</span>
    </div>
    <div className="w-[100%] laptop:w-[59%] flex flex-col h-[600px] shadow-xl rounded-md justify-evenly px-[10px] ">
      <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
        Information
        <hr></hr>
      </div>
      <div className="flex flex-col tablet:flex-row w-[100%] justify-start gap-[10px] tablet:gap-0">
        <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
          <span className="font-semibold text-[18px]">Email</span>
          <span className=" text-[16px]">{detail.email}</span>
        </div>
        <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
          <span className="font-semibold text-[18px]">Phone</span>
          <span className=" text-[16px]">{detail.phone}</span>
        </div>
      </div>
      <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
        Address
        <hr></hr>
      </div>
      <div className="flex flex-col tablet:flex-row  w-[100%] justify-start gap-[10px] tablet:gap-0">
        <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
          <span className="font-semibold text-[18px]">StreetAddress</span>
          <span className=" text-[16px]">{detail.streetAddress}</span>
        </div>
        <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
          <span className="font-semibold text-[18px]">City</span>
          <span className=" text-[16px]">{detail.city}</span>
        </div>
      </div>
      <div className="flex flex-col tablet:flex-row  w-[100%] justify-start gap-[10px] tablet:gap-0">
        <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
          <span className="font-semibold text-[18px]">State</span>
          <span className=" text-[16px]">{detail.state}</span>
        </div>
      </div>
      <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
        Transactions
        <hr></hr>
      </div>
      <div className="flex w-[100%] justify-start">
      <Link href={`/admin/staff/transaction/${detail.user.id}`} className="w-[150px] my-[15px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer">View Transactions</Link>
      </div>
    </div>
  </div>
    }
</div>
  );
};

export default page;
