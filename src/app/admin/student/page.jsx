"use client";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentData } from "@/store/employeesDetails/employeesDetailsThunk";

import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/joy";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.employeeDetails.students);
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    if (student.length === 0) {
      dispatch(fetchStudentData());
    }
    setLoading(false)
  }, [dispatch]);

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
                <th className=" flex justify-center items-center px-4 py-2 w-[15%]">
                  SN
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[15%]">
                  Name
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[15%]">
                  Phone
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[15%]">
                  Address
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[15%]">
                  Email
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[15%]">
                  Gender
                </th>
                <th className="flex justify-center items-center px-4 py-2 w-[10%]">
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
                    <td className="flex justify-center items-center px-4 py-2 w-[15%] ">
                      {index + 1}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[15%]  ">
                      {acc.firstName} {acc.lastName}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[15%]  ">
                      {acc.phone}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[15%] ">
                      {acc.streetAddress !== null
                        ? `${acc.streetAddress}`
                        : ""}
                      {/* {acc.state !== null ? `${acc.state},` : ""}
                      {acc.city !== null ? `${acc.city}` : ""} */}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[15%]  ">
                      {acc.email}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[15%]  ">
                      {acc.gender}
                    </td>
                    <td className="flex justify-center items-center px-4 py-2 w-[10%]  ">
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
