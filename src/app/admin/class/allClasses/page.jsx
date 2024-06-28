"use client"
import { setLoadingFalse, setLoadingTrue } from '@/store/loadingShow/loadingShow';
import { CircularProgress } from '@mui/joy';
import Link from 'next/link';
import React,{useEffect,useState} from 'react'
import { useDispatch} from "react-redux";

const page = () => {
  const dispatch=useDispatch()
  const[classes,setClasses]=useState([])
  const[loading,setLoading]=useState(true)
  useEffect(()=>{
    getClasses()
  },[])
  const getClasses=async()=>{
    let result = await fetch(`/api/admin/class`, {
      method: "get",
    });
    result = await result.json();
    setLoading(false)
    if (result.success === false) {
      router.push("/login");
    } else {
      if (result.classes) {
        console.log("classes are",result.classes)
        setClasses(result.classes);
      }
    }
  }
  console.log(classes.length)
  return (
    <div className='w-[100%] flex flex-col'>
      {loading?
      <CircularProgress className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"/>:
      <div className=' w-[100%] gap-[20px]  pl-[20px] flex mt-[30px] flex-wrap overflow-y-auto scrollbar-thin  scrollbar-thumb-[#420177] scrollbar-track-[#EBCBF5] '>
        {classes.length===0?
        <div className=' text-[20px] font-semibold text-[#070606] margin-auto'>Classes are seen here...</div>
      :
      classes.map((classes)=>{
         return(
       <Link href={`/admin/class/history/class/${classes.id}`} className='w-[98%] tablet:w-[47%] laptop:w-[23%] h-[250px] shadow-xl rounded-lg flex flex-col' key={classes.id}>
         <div className='w-[100%] h-[90px] bg-[#c75bc7] text-white font-bold flex justify-center px-[30px] text-[22px] flex-col'>
           <div>
           {classes.className}
           </div>
           <div className='text-[14px] font-semibold text-[#e7e7e7]'>~ By {classes.teacher.name}</div>
           </div>
           <div className='ml-[30px] pt-[30px] h-[160px] flex flex-col gap-[30px]'>
             <div className='font-sans text-[20px] font-bold text-[#494949]'>
               {classes._count.students} Students
               </div>
               <div className='font-mono text-[16px] flex flex-col font-medium'>
                <span>
                 {classes.startTime} to {classes.endTime} 
                </span>
                <span>
                  {(classes.startDate&&classes.endDate)?`${classes.startDate} to ${classes.endDate}`
                  :'' 
                }
                </span>
               </div>
           </div>
       </Link>
         );
      })
      
      }

      </div>
        
        }
    </div>
  )
}

export default page
