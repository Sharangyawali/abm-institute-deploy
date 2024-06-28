import React from "react";
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="h-[120px]  laptop:h-[75px] laptop:shadow-lg  w-[100%] flex justify-center">
      <div className="h-[100%] w-[100%] tablet:w-[85%] laptop:w-[80%]  flex laptop:justify-between items-center">
        <div className="flex w-[70%] laptop:w-[50%]  flex-col laptop:flex-row ">
            {/* Logo here */}
            <div className="h-[40px]  pt-[4px] text-black flex items-center justify-start font-bold font-mono text-[19px]">
            ABM-INSTITUTE
          </div>
          {/* content topics */}
          <div className="h-[40px] laptop:w-[45%] flex laptop:gap-[20px] laptop:ml-[40px] items-center laptop:justify-center text-[#777777] laptop:text-black font-normal">
            <div className="books  flex mr-[15px] laptop:mr-0 hover:text-secondary-color font-semibold  items-center cursor-pointer">
              <span> Home</span>
              {/* <div className="ml-[5px] mr-[15px] hidden laptop:block laptop:mr-0 laptop:ml-0">
                <FaChevronDown />
              </div> */}
            </div>
            <div className="stationery flex mr-[15px] laptop:mr-0 hover:text-secondary-color font-semibold  items-center cursor-pointer">
              <span> Services</span>
              {/* <div>
                <FaChevronDown />
              </div> */}
            </div>
            <div className="materials flex laptop:gap-1 hover:text-secondary-color font-semibold  items-center cursor-pointer">
              <span> Contacts</span>
              {/* <div> */}
                {/* <FaChevronDown /> */}
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="h-[40px] w-[30%] flex justify-end laptop:gap-[10px] laptop:pl-[10px]">
            <Link href={'/login'} className="h-[40px]  flex laptop:w-[40px] items-center">
              <FaRegUser size={27} className="cursor-pointer " />
            </Link>
            <div></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
