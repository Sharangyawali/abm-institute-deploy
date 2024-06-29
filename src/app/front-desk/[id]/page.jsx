"use client"
import { CircularProgress } from '@mui/joy'
import React,{useState,useEffect} from 'react'

const page = ({params}) => {
const [user,setUser]=useState({})
const [loading,setLoading]=useState(true)
useEffect(()=>{
    getUserDetail()
},[])

const getUserDetail = async () => {
    let result = await fetch(`/api/front-desk/visitors/${params.id}`, {
      method: "get",
    });
    result = await result.json();
    if (result.success === false) {
      toast.error(result.message);
      router.push("/login");
    } else {
        setLoading(false)
      setUser(result.visitor);
    }
  };

  return (
    <div className='w-[100%] h-[830px] bg-[#f0f0f0] flex flex-col p-[40px] items-center justify-center'>
        {loading?
        <CircularProgress/>
    :
        <div className='w-[95%] h-[750px] bg-white flex flex-col'>
            <div className='w-[100%] h-[130px] bg-white border-y-[2px] border-[#f0f0f0] flex justify-between items-center px-[100px]'>
                <div className='flex flex-col'>
                    <div className='text-[22px] text-[blue] font-serif'>
                   {user.firstName}{user.lastName}
                    </div>
                    <div className='text-[12px] text-[gray]'>
                        {user.streetAddress}, {user.city}, {user.state}
                    </div>
                    <div className='text-[12px] text-[gray]'>
                        {user.gender}
                    </div>
                    </div>
                    <div className='flex flex-col'>
                    <div className='text-[12px] text-[gray]'>
                    {user.phone}
                    </div>
                    <div className='text-[12px] text-[gray]'>
                        {user.email}
                    </div>
                   
                    </div>
            </div>
            <div className=' w-[100%] mt-[30px] h-[570px] flex flex-col items-center  overflow-y-auto scrollbar-thin  scrollbar-thumb-[#420177] scrollbar-track-[#EBCBF5] '>
                {user.history.length>0?
                user.history.map((hist)=>{
                    const date=new Date(hist.time);
                    const options = {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: false,
                      };
                      const formattedDate = date.toLocaleDateString("en-GB", options);

                    return(
                        <div className='w-[80%] rounded-2xl bg-[#f0f0f0] h-[100px] flex justify-between px-[100px] items-center mb-[20px]'>
                        <div className='inline-block font-mono text-[18px]'>Visited Time:<div className='inline-block text-[#585858] text-[16px] ml-[8px]'>
                        {formattedDate}
                            </div> </div>
                        <div className='inline-block font-mono text-[18px]'>
                            
                            Purpose:
                            <div className=' ml-[8px] inline-block text-[#585858] text-[16px]'>
    
                            {hist.purpose}
                            </div>
                            </div>
                    </div>
                    )
                })
            :''
            }
            </div>
        </div>

    }
      
    </div>
  )
}

export default page
