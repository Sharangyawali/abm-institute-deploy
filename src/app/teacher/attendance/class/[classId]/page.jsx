"use client";
import { CircularProgress } from "@mui/joy";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const page = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState();
  const [attendance, setAttendance] = useState({});
  const [attendanceId,setAttendanceId]=useState('')
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let result = await fetch(`/api/teacher/getClass/${params.classId}`, {
      method: "get",
    });
    result = await result.json();
    setLoading(false);
    if (result.success === true) {
      if (result.attendance) {
        setAttendance(result.attendance.record);
        setAttendanceId(result.attendance.id)
      } else if (result.classStudent) {
        setDetail(result.classStudent);
        const att=[]
        result.classStudent.forEach((std,index)=>{
          const name=`${std.student.firstName} ${std.student.lastName}`
          const id=std.student.id
          att.push({studentID:id,name:name,attendance:false})
        })
        setAttendance(att)
      }
    }
  };

  const handleClick=async()=>{
    setLoading(true)
    let result = await fetch(`/api/teacher/attendance/todays`, {
      method: "post",
      body: JSON.stringify({classId:params.classId,record:attendance,attendanceId:attendanceId}),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    setLoading(false)
    if(result.success===false){
      toast.error(result.message)
    }
    else{
      toast.success(result.message)
    }
  }

  const handleCheckboxChange = (index) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((stud, i) =>
        i === index ? { ...stud, attendance: !stud.attendance } : stud
      )
    );
  };

  return (
    <div className="w-[100%] flex flex-col p-[20px] items-center">
      {loading ? (
        <CircularProgress className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
      ) : (
        <div className="w-[100%] h-[90vh] justify-evenly tablet:w-[80%] laptop:w-[45%]  shadow-2xl rounded-xl flex flex-col  mobile:px-[30px]">
          <div className="w-[100%] h-[50px] text-[20px] font-bold text-[#272727] text-center mt-[10px]">
            Todays Attendance
          </div>
          <div className="w-[100%] h-[70vh] flex  justify-center  rounded-2xl shadow-[#e9e9e9] shadow-xl px-[10px]  ">
            <table className="w-full text-sm text-left flex flex-col rtl:text-right text-gray-500 ">
              <thead className="w-full text-xs text-gray-700 uppercase bg-[#e6e6e6] flex">
                <tr className="w-full flex">
                  <th scope="col" className="px-4 py-2 w-[33%]">SN</th>
                  <th scope="col" className="px-4 py-2 w-[33%]">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-2 w-[33%]">
                  </th>
                </tr>
              </thead>
              <tbody className="h-[350px] w-full overflow-y-scroll scrollbar-thin  scrollbar-thumb-[#420177] flex flex-col">
                  {attendance!==null&&Object.keys(attendance).length>0?
                              attendance.map((classStud,index)=>{
                                return(
                                  <tr className="bg-white border-b w-full flex" key={index}>
                                    <td className="px-4 py-2 w-[33%]">{index+1}</td>
                                    <td className="px-4 py-2 w-[33%]">{classStud.name}</td>
                                    <td className="px-4 py-2 w-[33%] mx-auto">
                                      <input type="checkbox" checked={classStud.attendance} onChange={() => handleCheckboxChange(index)}/>
                                    </td>
                                  </tr>
                                )
                              })
                :  
                ''
                }
              </tbody>
            </table>
          </div>
          <div className="w-[100%] flex items-center justify-center ">
          <div className="w-[150px] h-[40px] rounded-lg bg-[#a266b4] flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-[#9433ac]" onClick={handleClick}>Submit</div>
      </div>
        </div>
      )}
    </div>
  );
};

export default page;
