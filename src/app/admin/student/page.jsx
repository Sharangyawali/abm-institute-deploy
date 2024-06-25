"use client";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentData } from "@/store/employeesDetails/employeesDetailsThunk";

import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.employeeDetails.students);

  useEffect(() => {
    if (student.length === 0) {
      dispatch(fetchStudentData());
    }
  }, [dispatch]);

  return (
    <div className="w-[100%] flex justify-center items-center">
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
            <thead className="text-xs text-gray-700 uppercase bg-[#f3f3f3] flex">
              <tr className="min-w-[100%] flex bg-[#f3f3f3]">
                <th scope="col" className="px-4 py-2 w-[25%]">
                  SN
                </th>
                <th scope="col" className="px-4 py-2 w-[25%]">
                  Name
                </th>
                <th scope="col" className="px-4 py-2 w-[25%]">
                  Phone
                </th>
                <th scope="col" className="px-4 py-2 w-[25%]">
                  Address
                </th>
                <th scope="col" className="px-4 py-2 w-[25%]">
                  Email
                </th>
                <th scope="col" className="px-4 py-2 w-[25%]">
                  Gender
                </th>
              </tr>
            </thead>
            <tbody className="h-[350px] w-full overflow-y-scroll scrollbar-thin  scrollbar-thumb-[#420177] flex flex-col">
              {student.map((acc, index) => {
                return (
                  <tr
                    className="bg-white border-b min-w-[100%] flex cursor-pointer hover:bg-[#d6d6d6]"
                    key={index}
                    style={{ minHeight: "40px" }}
                    onClick={() => {
                      router.push(`/admin/student/${acc.id}`);
                    }}
                  >
                    <td className="px-4 py-2 w-[25%] text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 w-[25%]  text-center">
                      {acc.firstName} {acc.lastName}
                    </td>
                    <td className="px-4 py-2 w-[25%]  text-center">
                      {acc.phone}
                    </td>
                    <td className="px-4 py-2 w-[25%] text-wrap  text-center">
                      {acc.streetAddress !== null
                        ? `${acc.streetAddress},`
                        : ""}
                      {acc.state !== null ? `${acc.state},` : ""}
                      {acc.city !== null ? `${acc.city}` : ""}
                    </td>
                    <td className="px-4 py-2 w-[25%]  text-center">
                      {acc.email}
                    </td>
                    <td className="px-4 py-2 w-[25%]  items-center">
                      {acc.gender}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Content related to the selected role can go here */}
        </div>
      </div>
    </div>
  );
};

export default Page;
