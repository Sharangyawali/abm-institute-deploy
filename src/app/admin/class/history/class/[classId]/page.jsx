"use client";
import Modal from "@/app/admin/components/Modal";
import { setAttendanceDetails } from "@/store/attendanceDetails/attendanceDetails";
import { setLoadingFalse, setLoadingTrue } from "@/store/loadingShow/loadingShow";
import { CircularProgress } from "@mui/joy";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { GiTeacher } from "react-icons/gi";
import { useDispatch } from "react-redux";

const page = ({ params }) => {
    const dispatch=useDispatch()
  const[teachers,setTeachers]=useState([])
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
    const router=useRouter()
  const [showModal,setShowModal]=useState(false)
const [selectedTeacher,setSelectedTeacher]=useState()
const [selectedTeacherId,setSelectedTeacherId]=useState()
const[teacher,setTeacher]=useState('')
  useEffect(() => {
    getTeachers();
  }, []);

  useEffect(()=>{
   const teacherOptions= teachers.filter((obj)=>obj.id!=selectedTeacher.id)
   setTeachers(teacherOptions)
  },[selectedTeacher])

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
    getAttendance();
    }
  }

  const getAttendance = async () => {
    let result = await fetch(
      `/api/teacher/attendance/history/${params.classId}`,
      {
        method: "get",
      }
    );
    result = await result.json();
    setLoading(false);
    if (result.success === false) {
      toast.error(result.message);
    } else {
      setSelectedTeacher((result.attendance)[0].class.teacher)
      const attend = [];
      result.attendance.forEach((att, index) => {
        let present = 0;
        let absent = 0;
        att.record.forEach((rec, index) => {
          if (rec.attendance === true) present = present + 1;
          else if (rec.attendance === false) absent = absent + 1;
        });
        att = { ...att, present, absent };
        attend.push(att);
      });
      setAttendance(attend);
    }
  };

  const handleRoute=(record)=>{
    dispatch(setAttendanceDetails(record))
    router.push(`/admin/class/history/class/detail`)
  }
  const closeModal = () => setShowModal(false);
const registerNewTeacher=async()=>{
  if(selectedTeacherId && selectedTeacherId!==''){
    dispatch(setLoadingTrue())
    let result = await fetch(`/api/admin/class/${params.classId}`, {
      method: "post",
      body: JSON.stringify({teacherId:selectedTeacherId}),
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
    setShowModal(false)
  }
}
  return (
    <div className="w-[100%] flex flex-col p-[20px] items-center justify-center">
      {loading ? (
        <CircularProgress />
      ) :
      
      attendance.length>0?(
        <div className="w-[95%] h-[750px] bg-white flex flex-col items-center justify-center">
            <div className="w-[100%] h-[50px] flex justify-end items-center">
                <div className="w-[150px] h-[40px] flex justify-center rounded-lg cursor-pointer items-center bg-[purple] hover:bg-[#470f47] font-bold text-white" onClick={()=>setShowModal(true)}>
                  Change Teacher
                  </div>
            </div>
          <div className="w-[100%] h-[80px] bg-white  flex flex-col justify-center items-center px-[100px]">
            <div className="text-[22px] text-[blue] font-serif">
              {attendance[0].class.className}
            </div>
            <div className="text-[12px] text-[gray]">
              {attendance[0].class.teacher.name}
            </div>
            <div className="text-[12px] text-[gray]">
              {attendance[0].class.startTime}-{attendance[0].class.endTime}
            </div>
            {/* <div className='flex flex-col'>

            </div> */}
          </div>
          <div className="w-[80%] h-[670px] flex  justify-center  rounded-2xl shadow-[#e9e9e9] shadow-xl px-[10px]  ">
            <table className="w-full text-sm text-left flex flex-col rtl:text-right text-gray-500 ">
              <thead className="w-full text-xs text-gray-700 uppercase bg-[#e6e6e6] flex">
                <tr className="w-full flex">
                  <th scope="col" className="px-4 py-2 w-[25%]">
                    SN
                  </th>
                  <th scope="col" className="px-4 py-2 w-[25%]">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-2 w-[25%]">
                    Present
                  </th>
                  <th scope="col" className="px-4 py-2 w-[25%]">
                    Absent
                  </th>
                </tr>
              </thead>
              <tbody className="h-[350px] w-full overflow-y-scroll scrollbar-thin  scrollbar-thumb-[#420177] flex flex-col">
                {attendance !== null && attendance.length > 0
                  ? attendance.map((att, index) => {
                      return (

                        <tr 
                          className="bg-white border-b w-[100%] flex cursor-pointer hover:bg-[#ececec]"
                          key={index}
                          onClick={()=>handleRoute(att)}
                        >
                          <td className="px-4 py-2 w-[25%]">{index + 1}</td>
                          <td className="px-4 py-2 w-[25%]">{att.today}</td>
                          <td className="px-4 py-2 w-[25%] ">
                             {att.present}
                          </td>
                          <td className="px-4 py-2 w-[25%] ">
                             {att.absent}
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
          <Modal isOpen={showModal} onClose={closeModal}>
                  <div>
                    <h1 className="text-[16px] text-black font-semibold px-[15px] pt-[5px] my-[10px]">
                      Choose New Teacher
                    </h1>
                    <>
                    <div className="bg-[#f0f0f0] text-[black] p-[15px] text-[15px] font-sans">
                  Are your sure you want to change the teacher for class{" "}
                  <strong> {attendance[0].class.className} </strong>in which currently
                  <strong> {attendance[0].class.teacher.name} </strong> is serving.
                  <div className="flex justify-between items-center mt-[10px]">
                    <div className="font-semibold mt-[5px] font-sans text-[16px]">
                      New Teacher:
                    </div>
                  </div>
                  <div className="w-[100%] h-[40px] flex flex-row  items-center border-[2px] rounded-lg mt-[8px]">
                    <div className=" h-[30px] ml-[10px] flex flex-row items-center justify-center text-[#929292]">
                      <GiTeacher size={25} />
                    </div>
                    <div className=" relative flex items-center w-[90%]">
                    <select value={teacher} className='mt-1 border p-2 w-full rounded-md text-black' name='category' onChange={(e)=>{setTeacher(e.target.value);setSelectedTeacherId(e.target.value);}}>
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
                  </div>
                </div>
                <div className="bg-white px-[10px]">
                  <div
                    className="w-[160px] my-[15px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer"
                    onClick={registerNewTeacher}
                  >
                    Confirm Teacher
                  </div>
                </div>
                    </>
                    </div>
          </Modal>
        </div>
      ):'No detail to show'}
    </div>
  );
};

export default page;
