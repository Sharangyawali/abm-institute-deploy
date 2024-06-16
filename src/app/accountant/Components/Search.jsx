"use client";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import toast from "react-hot-toast";
import Link from "next/link";

const Search = () => {
  const [search,setSearch]=useState('')
  const [employee, setEmployee] = useState([]);
  const [show,setShow]=useState(false)
  const [result,setResult]=useState([])
  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    let result = await fetch("/api/accountant/employees", {
      method: "get",
    });
    result = await result.json();
    if (result.success === true) {
      setEmployee(result.users);
      getStudents();
    }
  };

  const getStudents = async () => {
    let result = await fetch(`/api/accountant/studentsOnly`, {
      method: "get",
    });
    result = await result.json();
    if (result.success === true) {
      console.log("students are", result.students);
      setEmployee((prev) => [...prev, ...result.students]);
    }
  };
  const handleSearch=(val)=>{
setSearch(val)
if(val.length>0){
  const showingAre=[]
  employee.forEach((emp,index)=>{
    const value=val.toLowerCase()
    if(emp.name && emp.role ){
      const name=emp.name.toLowerCase()
      if(value && name.includes(value)){
        showingAre.push({name:emp.name,role:emp.role,detail:emp})
      }
    }
    else if(emp.firstName && emp.lastName){
      const name=`${emp.firstName} ${emp.lastName}`
      const nameToLower=name.toLowerCase()
      if(value && nameToLower.includes(value)){
        showingAre.push ({name:name,role:'Student',detail:emp})
      }
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
    <div className="relative h-[40px]  laptop:w-[70%] flex flex-row justify-center items-center bg-[#dfdede] rounded-lg">
      <div className="flex items-center w-[80%]">
        <input
          className=" w-[100%] px-[5px] outline-none bg-[#dfdede] "
          type="text"
          value={search}
          onChange={(e)=>handleSearch(e.target.value)}
          name="search"
          placeholder="Search anyone here"
        />
      </div>
      <div className="w-[13%] h-[30px] flex flex-row items-center justify-center">
        <button className="w-[80%]">
          <GoSearch size={25} className="" />
        </button>
      </div>
      {
        show&&(
      <div className="absolute px-[5px] max-h-[300px] rounded-2xl z-[99] bg-white w-[100%] laptop:top-[63px] top-[85px] flex flex-col gap-[8px] overflow-y-scroll scrollbar-thin  scrollbar-thumb-[#420177] ">
        {result.map((res,index)=>{
          return(
        <Link href={`${res.role==='Student'?`/accountant/student/${res.detail.id}`:`/accountant/employee/${res.detail.id}`}`} className="w-[100%]  min-h-[100px] bg-white text-black  rounded-xl shadow-lg hover:bg-[#f0f0f0] shadow-[#dddddd] flex items-center tablet:px-[20px] justify-between" key={index} onClick={handleOnClick}>
          <div className="bg-[#d4d4d4] rounded-full ">
            <img
              className="w-[50px] h-[50px] rounded-full"
              src="/profile-demo.jpg"
            ></img>
          </div>
          <div className="text-[15px] text-ellipsis text-black w-[80%] relative flex flex-col">
            <strong>{ res.name}</strong>
            <span className="text-[12px] font-bold">{res.role}</span>
          </div>
        </Link>
          )
        })}
      </div>
        )
      }
    </div>
  );
};

export default Search;
