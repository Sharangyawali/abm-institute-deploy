"use client"
import React,{useState,useEffect} from 'react'
import { IoMdAdd } from "react-icons/io";
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import Modal from '../../components/Modal';
import { useRouter } from "next/navigation";
import { useDispatch} from "react-redux";
import { setLoadingFalse, setLoadingTrue } from '@/store/loadingShow/loadingShow';
import toast from 'react-hot-toast';

const TopBar = () => {
  const router = useRouter();
  const pathName = usePathname()
  const dispatch=useDispatch()
  const [showModal,setShowModal]=useState(false)
  const [error,setError]=useState(false)
  const [subject,setSubject]=useState('')
  const[startTime,setStartTime]=useState('')
  const[endTime,setEndTime]=useState('')
  const[teacher,setTeacher]=useState('')
  const[teachers,setTeachers]=useState([])
  const [startDate,setStartDate]=useState()
  const [endDate,setEndDate]=useState()
  const handleToogle=()=>{
    setShowModal(true)
  }
  const closeModal = () => setShowModal(false);

useEffect(()=>{
getTeachers()
},[])

const getTeachers=async()=>{
  let result = await fetch(`/api/admin/getTeachers`, {
    method: "get",
  });
  result = await result.json();
  if (result.success === false) {
    router.push("/login");
  } else {
    if (result.teachers) {
      setTeachers(result.teachers);
    }
  }
}



const addClass=async()=>{
  if(subject===''||startTime===''||endTime===''||teacher===''||!startDate||startDate===''||!endDate||endDate===''){
    setError(true)
  }
  else{
    dispatch(setLoadingTrue())
    let result = await fetch(`/api/admin/class`, {
      method: "post",
      body: JSON.stringify({subject,startTime,endTime,teacher:teacher,endDate,startDate}),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    dispatch(setLoadingFalse())
    if (result.success === false) {
      toast.error(result.message)
    } 
    else{
      toast.success(result.message)
    }
  }
}
  return (
    <div className='w-[100%] h-[70px] flex bg-[#e6e6e6] justify-between px-[50px] items-center'>
      <div className='text-[black] font-serif relative font-bold'>
        <Link href='/admin/class/allClasses'> All Classes</Link>
        {pathName==='/admin/class/allClasses'?
        <div className='w-[80px] h-[5px] rounded-lg bg-[#a16db1] absolute top-[43px]'></div>
        :''
        }
       </div>
      <div className='w-[160px] h-[50px] bg-[#5151cc] text-[16px] items-center justify-evenly flex text-white rounded-lg cursor-pointer' onClick={handleToogle}>
        <IoMdAdd size={25}/>
        Add Classes</div>

        <Modal isOpen={showModal} onClose={closeModal}>
          <div className=''>
          <h1 className="text-[16px] text-black font-semibold px-[15px] pt-[5px] my-[10px]">
            Add Class
          </h1>
          <div className="bg-[#f0f0f0] text-[black] p-[15px] text-[15px] font-sans flex flex-col gap-[5px]">
          <label className="flex my-[3px] font-medium ">Subject Name
            {error&&(subject==='')?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide subject name</div>
          :''  
          }
            </label>
            <div className="flex w-[100%] flex-col gap-[5px]">
                <input
                  type="text"
                  placeholder='ex: Physics'
                  value={subject}
                  onChange={(e)=>setSubject(e.target.value)}
                  className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
                />
              </div>
              <label className="flex my-[3px] font-medium ">Start time
            {error&&(startTime==='')?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide start time</div>
          :''  
          }
            </label>
            <div className="flex w-[100%] flex-col gap-[5px]">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e)=>setStartTime(e.target.value)}
                  className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
                />
              </div>
              <label className="flex my-[3px] font-medium ">Ending time
            {error&&(endTime==='')?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide ending time</div>
            :''  
          }
            </label>
            <div className="flex w-[100%] flex-col gap-[5px]">
                <input
                  type="time"
                  value={endTime}
                  onChange={(e)=>setEndTime(e.target.value)}
                  className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
                />
              </div>
              <label className="flex my-[3px] font-medium ">Start date
            {error&&(!startDate||startDate==='')?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide start date</div>
            :''  
          }
            </label>
            <div className="flex w-[100%] flex-col gap-[5px]">
                <input
                value={startDate}
                onChange={(e)=>setStartDate(e.target.value)}
                  type="date"
                  className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
                />
              </div>
              <label className="flex my-[3px] font-medium ">Ending date
            {error&&(!endDate||endDate==='')?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide ending date</div>
            :''  
          }
            </label>
            <div className="flex w-[100%] flex-col gap-[5px]">
                <input
                value={endDate}
                onChange={(e)=>setEndDate(e.target.value)}
                  type="date"
                  className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
                />
              </div>
              <label className="flex my-[3px] font-medium ">Teacher
            {error&&(teacher==='')?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide associated teacher</div>
          :''  
          }
            </label>
            <select value={teacher} className='mt-1 border p-2 w-full rounded-md text-black' name='category' onChange={(e)=>setTeacher(e.target.value)}>
                  <option value={""}>
                    Select Teacher
                  </option>
                  {
                    teachers.length>0&&teachers.map((el, index) => {
                      return (
                        <option value={el.id} key={el.id}>
                          {el.name}
                        </option>
                      )
                    })
                  }
                </select>
          </div>
          <div className="bg-white px-[10px]">
              <div className="w-[120px] my-[15px] mt-[20px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer" onClick={addClass}>Confirm class</div>
            </div>
          </div>
        </Modal>
    </div>
  )
}

export default TopBar
