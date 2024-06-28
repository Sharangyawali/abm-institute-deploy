"use client";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/joy";

const Page = () => {
  const [loading,setLoading]=useState(true)
  const router = useRouter();
  const [student,setStudent]=useState()

  useEffect(() => {
    getStudent()

  }, []);

  const getStudent=async()=>{
    let result = await fetch(`/api/accountant/studentsOnly`, {
      method: "get",
    });
    result = await result.json();
    setLoading(false)
    if (result.success === true) {
      setStudent(result.students)
    }
  }

  return (
    <div className="w-[100%] flex justify-center items-center">
      {
        loading?<CircularProgress></CircularProgress>:

      <div className="w-[100%] laptop:w-[90%] h-[800px]  flex flex-col justify-start  shadow-2xl">
        <div className="w-[100%] px-[20px] flex justify-between">
          <div className="relative text-[15px] flex flex-col h-[50px] font-semibold w-[125px]">
            <div className="flex justify-between items-center w-[100%]">
              <div>Students</div>
              <IoMdArrowDropdown className="ml-[8px]" size={25} />
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[650px]  laptop:px-[10px] overflow-x-scroll scrollbar-thin  scrollbar-thumb-[#420177]">
        <table className="w-[100%] text-sm text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-[#f3f3f3]">
              <tr className="flex w-full">
                <th className=" flex justify-center items-center px-4 py-2 w-[12%]">
                  SN
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[12%]">
                  Name
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[12%]">
                  Phone
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[12%]">
                  Address
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[12%]">
                  Email
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[12%]">
                  Gender
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[12%]">
                  Active
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[12%]">
                  Fee
                </th>
              </tr>
            </thead>
            <tbody className="text-xs  flex flex-col h-[600px] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#420177]">
              {student.map((acc, index) => {
                let agreed=parseFloat(acc.agreedFee)
                let transactions=0;
                acc.payments.forEach((pay,index)=>{
                  transactions=transactions+parseFloat(pay.amount)
                })
                return (
                  <tr
                    className="flex w-full bg-white border-b cursor-pointer hover:bg-[#d6d6d6] max-h-[60px]"
                    key={index}
                    style={{ minHeight: "40px" }}
                    onClick={() => {
                      router.push(`/admin/student/${acc.id}`);
                    }}
                  >
                    <td className="flex justify-center items-center px-4 py-2 w-[12%] ">
                      {index + 1}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[12%]  ">
                      {acc.firstName} {acc.lastName}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[12%]  ">
                      {acc.phone}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[12%] ">
                      {acc.streetAddress !== null
                        ? `${acc.streetAddress}`
                        : ""}
                      {/* {acc.state !== null ? `${acc.state},` : ""}
                      {acc.city !== null ? `${acc.city}` : ""} */}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[12%]  ">
                      {acc.email}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[12%]  ">
                      {acc.gender}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[12%]  ">
                      {acc.active?
                    <div className="w-[80%] min-w-[80px] bg-[green] text-[white] text-[16px] font-semibold flex justify-center items-center px-2 py-2 rounded-md">Active</div>  :
                    <div className="w-[80%] min-w-[80px] bg-[red] text-[white] text-[16px] font-semibold flex justify-center items-center px-2 py-2 rounded-md">Left</div>
                    }
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[12%]  ">
                        {transactions<agreed?
                        <div className="w-[120px] bg-[red] text-[white] text-[16px] font-semibold flex justify-center items-center px-2 py-2 rounded-md">
                            Remaining
                        </div>
                        :<div className="w-[120px] bg-[green] text-[white] text-[16px] font-semibold flex justify-center items-center px-2 py-2 rounded-md">
                        Completed
                    </div>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Content related to the selected role can go here */}
        </div>
      </div>
      }
    </div>
  );
};

export default Page;
