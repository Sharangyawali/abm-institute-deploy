"use client"
import React,{useEffect,useState} from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { CircularProgress } from '@mui/joy'

const page = ({params}) => {
    const router=useRouter()
const [loading,setLoading]=useState(true)
const [name,setName]=useState('')
const [streetAddress,setStreetAddress]=useState('')
const [city,setCity]=useState('')
const [state,setState]=useState('')
const [gender,setGender]=useState('')
const [phone,setPhone]=useState('')
const [email,setEmail]=useState('')
const [salary,setSalary]=useState([])
useEffect(()=>{
    getEmployeeDetail()
},[])

const getEmployeeDetail = async () => {
    let result = await fetch(`/api/accountant/employees/${params.id}`, {
      method: "get",
    });
    result = await result.json();
    setLoading(false)
    if (result.success === false) {
      toast.error(result.message);
      router.push("/login");
    } else {
        
        if(result.employee){
            console.log(result.employee,"is the employee detail")
            const employee=result.employee
            if(employee.teacher!==null){
                setName(employee.teacher.name)
                setStreetAddress(employee.teacher.streetAddress)
                setCity(employee.teacher.city)
                setState(employee.teacher.state)
                setPhone(employee.teacher.phone)
                setEmail(employee.teacher.email)
                setGender(employee.teacher.gender)
                setSalary(employee.teacher.salary)
            }
            else if(employee.accountant!==null){
                setName(employee.accountant.name)
                setStreetAddress(employee.accountant.streetAddress)
                setCity(employee.accountant.city)
                setState(employee.accountant.state)
                setPhone(employee.accountant.phone)
                setEmail(employee.accountant.email)
                setGender(employee.accountant.gender)
                setSalary(employee.accountant.salary)
            }
            else if(employee.frontDesk!==null){
                setName(employee.frontDesk.name)
                setStreetAddress(employee.frontDesk.streetAddress)
                setCity(employee.frontDesk.city)
                setState(employee.frontDesk.state)
                setPhone(employee.frontDesk.phone)
                setEmail(employee.frontDesk.email)
                setGender(employee.frontDesk.gender)
                setSalary(employee.frontDesk.salary)
            }
        }
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
               {name} 
                </div>
                <div className='text-[12px] text-[gray]'>
                    {streetAddress}, {city}, {state}
                </div>
                <div className='text-[12px] text-[gray]'>
                    {gender}
                </div>
                </div>
                <div className='flex flex-col'>
                <div className='text-[12px] text-[gray]'>
                {phone}
                </div>
                <div className='text-[12px] text-[gray]'>
                    {email}
                </div>
               
                </div>
        </div>
        <div className=' w-[100%] mt-[30px] h-[570px] flex flex-col items-center  overflow-y-auto scrollbar-thin  scrollbar-thumb-[#420177] scrollbar-track-[#EBCBF5] '>
            {salary.length>0?
            salary.map((sal,index)=>{
                const date=new Date(sal.createdAt);
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
                    <div className='w-[80%] rounded-2xl bg-[#f0f0f0] h-[100px] flex justify-between px-[100px] items-center mb-[20px]' key={index}>
                    <div className='inline-block font-mono text-[18px]'>Salary Payed Time:<div className='inline-block text-[#585858] text-[16px] ml-[8px]'>
                    {formattedDate}
                        </div> </div>
                        <div className='flex flex-col'>
                    <div className='inline-block font-mono text-[18px]'>
                        
                        Amount:
                        <div className=' ml-[8px] inline-block text-[#585858] text-[16px]'>

                        {sal.amount}
                        </div>
                        </div>
                    <div className='inline-block font-mono text-[18px]'>
                        
                        Method:
                        <div className=' ml-[8px] inline-block text-[#585858] text-[16px]'>

                        {sal.method}
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
