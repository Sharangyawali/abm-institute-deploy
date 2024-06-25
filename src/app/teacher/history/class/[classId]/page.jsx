"use client";
import { setAttendanceDetails } from "@/store/attendanceDetails/attendanceDetails";
import { CircularProgress } from "@mui/joy";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const page = ({ params }) => {
    const dispatch=useDispatch()
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
    const router=useRouter()
  useEffect(() => {
    getAttendance();
  }, []);

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
      console.log(result.attendance);
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
      console.log(attend);
      setAttendance(attend);
    }
  };

  const handleRoute=(record)=>{
    dispatch(setAttendanceDetails(record))
    router.push(`/teacher/history/class/detail`)
  }

  return (
    <div className="w-[100%] flex flex-col p-[20px] items-center justify-center">
      {loading ? (
        <CircularProgress className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
      ) : 
      
      attendance.length>0?
      (
        <div className="w-[95%] h-[750px] bg-white flex flex-col items-center justify-center">
          <div className="w-[100%] h-[80px] bg-white  flex flex-col justify-center items-center px-[100px]">
            <div className="text-[22px] text-[blue] font-serif">
              {attendance[0].class.className}
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
        </div>
      ):'No any data to show'}
    </div>
  );
};

export default page;
