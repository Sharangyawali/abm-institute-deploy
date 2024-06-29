"use client"
import { CircularProgress } from '@mui/joy'
import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const page = ({params}) => {
    const router=useRouter()

    const [student,setStudent]=useState({})
const [loading,setLoading]=useState(true)
useEffect(()=>{
    getStudentDetail()
},[])
const getStudentDetail = async () => {
    let result = await fetch(`/api/accountant/students/${params.id}`, {
      method: "get",
    });
    result = await result.json();
    if (result.success === false) {
      toast.error(result.message);
      router.push("/login");
    } else {
        setLoading(false)
      setStudent(result.student);
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
               {student.firstName} {student.lastName}
                </div>
                <div className='text-[12px] text-[gray]'>
                    {student.streetAddress}, {student.city}, {student.state}
                </div>
                <div className='text-[12px] text-[gray]'>
                    {student.gender}
                </div>
                </div>
                <div className='flex flex-col'>
                <div className='text-[12px] text-[gray]'>
                {student.phone}
                </div>
                <div className='text-[12px] text-[gray]'>
                    {student.email}
                </div>
               
                </div>
        </div>
        <div className=' w-[100%] mt-[30px] h-[570px] flex flex-col items-center  overflow-y-auto scrollbar-thin  scrollbar-thumb-[#420177] scrollbar-track-[#EBCBF5] '>
            {student.payments.length>0?
            student.payments.map((pay)=>{
                const date=new Date(pay.createdAt);
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
                    <div className='inline-block font-mono text-[18px]'>Payed Time:<div className='inline-block text-[#585858] text-[16px] ml-[8px]'>
                    {formattedDate}
                        </div> </div>
                        <div className='flex flex-col'>
                    <div className='inline-block font-mono text-[18px]'>
                        
                        Amount:
                        <div className=' ml-[8px] inline-block text-[#585858] text-[16px]'>

                        {pay.amount}
                        </div>
                        </div>
                    <div className='inline-block font-mono text-[18px]'>
                        
                        Method:
                        <div className=' ml-[8px] inline-block text-[#585858] text-[16px]'>

                        {pay.method}
                        </div>
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
