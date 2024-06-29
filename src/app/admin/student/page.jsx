"use client";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentData } from "@/store/employeesDetails/employeesDetailsThunk";

import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/joy";
import { GoSearch } from "react-icons/go";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.employeeDetails.students);
  const [loading,setLoading]=useState(true)
  const [search,setSearch]=useState('')
  const [result,setResult]=useState([])
  const [show,setShow]=useState(false)

  useEffect(() => {
    if (student.length === 0) {
      dispatch(fetchStudentData());
    }
    setLoading(false)
  }, [dispatch]);


  const handleSearch=(val)=>{
    setSearch(val)
    if(val.length>0){
      const showingAre=[]
      student.forEach((st,index)=>{
        const value=val.toLowerCase()
          const name=st.phone.toLowerCase()
          if(value && name.includes(value)){
            showingAre.push({detail:st})
          }
        
      })
      if(showingAre&&showingAre.length>0){
        setShow(true)
      }
      setResult(showingAre)
    }
    else{
      setResult([])
    }
      }
    
    
    const handleOnClick=()=>{
      setShow(false)
      setResult([])
    }

  return (
    <div className="w-[100%] flex justify-center items-center">
      {
        loading?<CircularProgress></CircularProgress>:

      <div className="w-[100%] laptop:w-[90%] h-[800px]  flex flex-col justify-start  shadow-2xl">
        <div className="w-[100%] px-[20px] flex justify-between">
          <div className="relative text-[15px] flex items-start justify-between h-[60px] font-semibold w-[100%]">
            <div className="flex justify-between items-center w-[125px]">
              <div>Students</div>
              <IoMdArrowDropdown className="ml-[8px]" size={25} />
            </div>
          </div>



          <div className="relative h-[40px]  laptop:w-[30%] flex flex-row justify-center items-center bg-[#dfdede] rounded-lg">
      <div className="flex items-center w-[80%]">
        <input
          className=" w-[100%] px-[5px] outline-none bg-[#dfdede] "
          type="text"
          value={search}
          onChange={(e)=>handleSearch(e.target.value)}
          name="search"
          placeholder="Search with phone number"
        />
      </div>
      <div className="w-[13%] h-[30px] flex flex-row items-center justify-center">
        <button className="w-[80%]">
          <GoSearch size={25} className="" />
        </button>
      </div>
      {
        show&&(
      <div className="absolute px-[5px] max-h-[300px] rounded-2xl z-[99] bg-white w-[100%]  top-[55px] flex flex-col gap-[8px] overflow-y-scroll scrollbar-thin  scrollbar-thumb-[#420177] ">
        {result.map((res,index)=>{
          return(
        <Link href={`/admin/student/${res.detail.id}`} className="w-[100%]  min-h-[100px] bg-white text-black  rounded-xl shadow-lg hover:bg-[#f0f0f0] shadow-[#dddddd] flex items-center tablet:px-[20px] justify-between" key={index} onClick={handleOnClick}>
          <div className="bg-[#d4d4d4] rounded-full ">
            <img
              className="w-[50px] h-[50px] rounded-full"
              src='/profile-demo.jpg'
            ></img>
          </div>
          <div className="text-[15px] text-ellipsis text-black w-[80%] relative flex flex-col">
            <strong>{ res.detail.phone}</strong>
            <span className="text-[12px] font-bold">{res.detail.firstName} {res.detail.lastName}</span>
          </div>
        </Link>
          )
        })}
      </div>
        )
      }
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
