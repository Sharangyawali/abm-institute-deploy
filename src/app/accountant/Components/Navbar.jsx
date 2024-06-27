import React from "react";
import Search from "./Search";
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";
import { IoLogOut } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
const Navbar = () => {
  const router=useRouter()
  const handleLogout=async()=>{
    let result=await fetch('/api/users/auth/logout',{
      method:'post'
    })
    result=await result.json()
    if(result.success===true){
      router.push('/login')
    }
    // Cookies.remove('authToken')
    // Cookies.remove('role')
  // router.push('/login')
   }
  return (
    <div className="h-[120px]  laptop:h-[75px] shadow-lg  w-[100%] flex justify-center">
      <div className="h-[100%] w-[100%] tablet:w-[95%] laptop:w-[90%]  flex laptop:justify-between items-center">
        <div className="flex w-[55%]  flex-col laptop:flex-row ">
          <div className="h-[40px]  pt-[4px] text-black flex items-center justify-start font-bold font-mono text-[19px]">
            ABM-INSTITUTE
          </div>
          {/* content topics */}
          <div className="h-[40px] laptop:w-[60%] flex laptop:gap-[10px] laptop:ml-[40px] items-center laptop:justify-evenly  text-[#777777] laptop:text-black font-normal">
            <div className="stationery flex mr-[15px] laptop:mr-0 hover:text-secondary-color font-semibold dark:hover:text-primary-color items-center cursor-pointer">
              <Link href="/accountant/dashboard"> Dashboard</Link>
            </div>
            <div className="books  flex mr-[15px] laptop:mr-0 hover:text-secondary-color font-semibold dark:hover:text-primary-color items-center cursor-pointer">
              <Link href="/accountant/transactions/studentsFee">
                Transactions
              </Link>
            </div>
            <div className="books  flex mr-[15px] laptop:mr-0 hover:text-secondary-color font-semibold dark:hover:text-primary-color items-center cursor-pointer">
              <Link href="/accountant/admission"> Addmission</Link>
            </div>
            <div className="books  flex mr-[15px] laptop:mr-0 hover:text-secondary-color font-semibold dark:hover:text-primary-color items-center cursor-pointer">
              <Link href="/accountant/store/allProducts"> Store</Link>
            </div>
            <div className="books  flex mr-[15px] laptop:mr-0 hover:text-secondary-color font-semibold dark:hover:text-primary-color items-center cursor-pointer">
              <Link href="/accountant/student"> Students</Link>
            </div>
          </div>
        </div>
        <div className=" w-[35%] flex flex-col laptop:flex-row   gap-[10px] laptop:justify-between mr-[30px] laptop:mr-0 laptop:gap-[20px] pl-[10px]">
          <Search />
          <div className="flex justify-end">

          <div className="h-[40px]  flex  flex-row gap-[30px] laptop:gap-0 justify-end mt-[2px] tablet:mt-[9px]">
            <Link href={`/accountant/userAccount`}>
            <FaRegUser size={27} className="cursor-pointer " />
            </Link>
          </div>
          <div className="h-[40px]  flex  flex-row gap-[30px] laptop:gap-0 justify-end mt-[2px] tablet:mt-[9px]">
          <IoLogOut size={30} className="cursor-pointer " onClick={handleLogout}/>
        </div>

            </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
