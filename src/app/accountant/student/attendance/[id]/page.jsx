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
          <table className="w-[100%] laptop:w-[80%] text-sm text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-[#f3f3f3]">
              <tr className="flex w-full">
                <th className=" flex justify-center items-center px-4 py-2 w-[25%]">
                  SN
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[25%]">
                  Class Name
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[25%]">
                  Total Present
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[25%]">
                  Total Absent
                </th>
              </tr>
            </thead>
            <tbody className="text-xs  flex flex-col h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#420177]">
        {student.classes.map((classs,index)=>{
            let present=0
            let absent=0
            classs.class.attendance.forEach((att,index)=>{
                const isAttend=att.record.find(obj=>obj.studentID===params.id)
                if(isAttend){
                    if(isAttend.attendance===true){
                        present=present+1
                    }
                    else if(isAttend.attendance===false){
                        absent=absent+1
                    }
                }
            })
            return(
                <tr className="flex w-full bg-white border-b cursor-pointer hover:bg-[#d6d6d6] max-h-[60px]" key={index}>
                    <td className="flex justify-center items-center px-4 py-2 w-[25%]">
                        {index+1}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[25%]">
                        {classs.class.className}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[25%]">
                        {present}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[25%]">
                        {absent}
                    </td>
                </tr>
            )
        })}
            </tbody>
            </table>
        </div>
    </div>

}
  
</div>
  )
}

export default page
