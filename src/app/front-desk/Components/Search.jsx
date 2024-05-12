import React from 'react'
import { GoSearch } from "react-icons/go";

const Search = () => {
  return (
    <div className='h-[40px]  laptop:w-[70%] flex flex-row justify-center items-center bg-[#dfdede] rounded-lg'>
    <div className="flex items-center w-[80%]">
    <input
      className=" w-[100%] px-[5px] outline-none bg-[#dfdede] "
      type="text"
      name=""
      placeholder="Search anyone here"
    />
  </div>
  <div className="w-[13%] h-[30px] flex flex-row items-center justify-center">
    <button className="w-[80%]">
      <GoSearch size={25} className=''/>
    </button>
  </div>
    </div>
  )
}

export default Search
