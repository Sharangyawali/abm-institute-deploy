"use client";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import toast from "react-hot-toast";
import Link from "next/link";

const Search = () => {
  const [search,setSearch]=useState('')
  const [visitor, setVisitor] = useState([]);
  const [show,setShow]=useState(false)
  const [result,setResult]=useState([])
  useEffect(() => {
    getVisitors();
  }, []);

  const getVisitors = async () => {
    let result = await fetch("/api/front-desk/visitors", {
      method: "get",
    });
    result = await result.json();
    if (result.success === true) {
      setVisitor(result.visitors);
    }
  };


  const handleSearch=(val)=>{
setSearch(val)
if(val.length>0){
  const showingAre=[]
  visitor.forEach((emp,index)=>{
    const value=val.toLowerCase()
      const name=`${emp.firstName} ${emp.lastName}`
      const nameToLower=name.toLowerCase()
      if(value && nameToLower.includes(value)){
        showingAre.push ({name:name,phone:emp.phone,detail:emp})
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
  setSearch('')
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
        <Link href={`${`/front-desk/${res.detail.id}`}`} className="w-[100%]  min-h-[100px] bg-white text-black  rounded-xl shadow-lg hover:bg-[#f0f0f0] shadow-[#dddddd] flex items-center tablet:px-[20px] justify-between" key={index} onClick={handleOnClick}>
          <div className="bg-[#d4d4d4] rounded-full ">
            <img
              className="w-[50px] h-[50px] rounded-full"
              src="/profile-demo.jpg"
            ></img>
          </div>
          <div className="text-[15px] text-ellipsis text-black w-[80%] relative flex flex-col">
            <strong>{ res.name}</strong>
            <span className="text-[12px] font-bold">{res.phone}</span>
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
