"use client";
import React from "react";
import { useSelector } from "react-redux";
const page = () => {
  const record = useSelector((state) => state.attendanceDetail.detail);
  console.log(record);
  return (
    <div className="w-[100%] flex flex-col p-[20px] items-center">
      {record.length === 0 ? (
        <div className="font-bold">
          No record to show ! Try selecting date again
        </div>
      ) : (
        <div className="w-[95%] h-[750px] bg-white flex flex-col items-center justify-center">
          <div className="w-[80%] h-[80px] bg-white  flex  justify-between items-center px-[100px]">
            <div className="flex flex-col">
              <div className="text-[22px] text-[blue] font-serif">
                {record[0].class.className}
              </div>
              <div className="text-[12px] text-[gray]">{record[0].today}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[12px] text-[gray]">
                Present:{record[0].present}
              </div>
              <div className="text-[12px] text-[gray]">
                Absent: {record[0].absent}
              </div>
            </div>
          </div>
          <div className="w-[80%] h-[670px] flex  justify-center  rounded-2xl shadow-[#e9e9e9] shadow-xl px-[10px]  ">
            <table className="w-full text-sm text-left flex flex-col rtl:text-right text-gray-500 ">
              <thead className="w-full text-xs text-gray-700 uppercase bg-[#e6e6e6] flex">
                <tr className="w-full flex">
                  <th scope="col" className="px-4 py-2 w-[33%]">
                    SN
                  </th>
                  <th scope="col" className="px-4 py-2 w-[33%]">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-2 w-[33%]"></th>
                </tr>
              </thead>
              <tbody className="h-[350px] w-full overflow-y-scroll scrollbar-thin  scrollbar-thumb-[#420177] flex flex-col">
                {record !== null &&
                Object.keys(record[0]).length > 0 &&
                record[0].record !== null &&
                record[0].record.length > 0
                  ? record[0].record.map((rec, index) => {
                      return (
                        <tr
                          className="bg-white border-b w-full flex"
                          key={index}
                        >
                          <td className="px-4 py-2 w-[33%]">{index + 1}</td>
                          <td className="px-4 py-2 w-[33%]">{rec.name}</td>
                          <td className="px-4 py-2 w-[33%] mx-auto">
                            <input
                              type="checkbox"
                              checked={rec.attendance}
                              readOnly={true}
                            />
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
