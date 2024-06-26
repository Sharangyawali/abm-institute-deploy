"use client";
import { CircularProgress } from "@mui/joy";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
const page = () => {
  const router=useRouter()
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState();
  useEffect(() => {
    getDetail();
  }, []);
  
  const getDetail = async () => {
    let result = await fetch("/api/teacher/detail", { method: "get" });
    result = await result.json();
    setLoading(false);
    if (result.success === false) {
      router.push('/login')
      toast.error(result.message)
    } else {
      setDetail(result.detail);
      console.log(result.detail);
    }
  };
  console.log(detail,"are the detail of teachers")
  return (
    <div className="w-[100%] flex flex-col p-[20px]">
      {loading ? (
        <CircularProgress className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
      ) : (
        <div className=" w-[100%] gap-[20px]  pl-[20px] flex mt-[30px] flex-wrap overflow-y-auto scrollbar-thin  scrollbar-thumb-[#420177] scrollbar-track-[#EBCBF5] ">
          {!detail.teacher?
          ''
          :
          detail.teacher.class.length === 0 ? (
            <div className=" text-[20px] font-semibold text-[#070606] margin-auto">
              Classes are seen here...
            </div>
          ) : (
            detail.teacher.class.map((classes) => {
              return (
                <Link
                href={`/teacher/attendance/class/${classes.id}`}
                  className="w-[98%] tablet:w-[47%] laptop:w-[23%] h-[250px] shadow-xl rounded-lg flex flex-col"
                  key={classes.id}
                >
                  <div className="w-[100%] h-[90px] bg-[#c75bc7] text-white font-bold flex justify-center px-[30px] text-[22px] flex-col">
                    <div>
                      {classes.className}
                    </div>
                    <div className="text-[14px] font-semibold text-[#e7e7e7]">
                     ~ {classes.startTime} to {classes.endTime}
                    </div>
                  </div>
                  <div className="ml-[30px] pt-[30px] h-[160px] flex flex-col gap-[30px]">
                    <div className="font-sans text-[20px] font-bold text-[#494949]">
                      {classes._count.students} Students
                    </div>
                    <div className="font-mono text-[16px] font-medium"></div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default page;
