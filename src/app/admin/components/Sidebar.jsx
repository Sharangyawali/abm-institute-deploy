"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { GiCube } from "react-icons/gi";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { SlDocs } from "react-icons/sl";
import { LuMessagesSquare } from "react-icons/lu";
import { MdAccountCircle, MdLockOutline } from "react-icons/md";
import { FaPersonShelter } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlinePayment } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { IoIosPersonAdd } from "react-icons/io";
import { FaStore } from "react-icons/fa";
import generator from "generate-password";
import { MdPassword } from "react-icons/md";
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { setLoadingFalse, setLoadingTrue } from '@/store/loadingShow/loadingShow';
import toast from 'react-hot-toast';
const Sidebar = ({show}) => {
  const dispatch = useDispatch();
  const pathName = usePathname()
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState("");
  const [password, setPassword] = useState("");
  const closeModal = () => setIsModalOpen(false);
  const generatePassword = () => {
    var password = generator.generate({
      length: 10,
      numbers: true,
      uppercase: true,
    });
    setPassword(password);
  };

  const confirmPassword=async()=>{
    if (password.length < 6) {
      setError(true);
    } 
    else{
      dispatch(setLoadingTrue());
      let result = await fetch("/api/admin/changeYourPassword", {
        method: "post",
        body: JSON.stringify({password: password }),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      dispatch(setLoadingFalse())
      if(result.success===false){
        toast.error(result.message)
      }
      else{
        toast.success(result.message)
      }
    }
  }
  return (
    <div className='w-[100%] h-[100%]'>
    <div className="flex flex-col items-center w-[100%] h-full overflow-hidden text-black bg-white ">
      <a className={show===true?'flex  items-center w-full px-3 mt-3':"flex justify-center items-center  w-full px-3 mt-3"} href="#">
          <GiCube className='w-[30px] h-[30px]' color='black'/>
          {show===true?
    (<span className="ml-2 text-sm font-bold">GoTo App</span>):
    ''
  }
      </a>
      <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-black">
              <Link href='/admin/dashboard' className={pathName==='/admin/dashboard'?"flex items-center w-full h-10 px-3 mt-2 rounded text-[#272727] bg-gray-300":"flex items-center w-full h-10 px-3 mt-2 rounded hover:text-[#272727] hover:bg-gray-300"} >
              <FaHome className='w-[25px] h-[25px]' color='black'/>
      {show===true?
    (<span className="ml-2 text-sm font-medium">Dashboard</span>):
    ''
  }
                  
              </Link>
              <Link href='/admin/class/allClasses' className={pathName.startsWith('/admin/class')?"flex items-center w-full h-10 px-3 mt-2 rounded text-[#272727] bg-gray-300":"flex items-center w-full h-10 px-3 mt-2 rounded hover:text-[#272727] hover:bg-gray-300"} >
                  <SiGoogleclassroom className='w-[25px] h-[25px]' color='black'/>
        {show===true?
    (<span className="ml-2 text-sm font-medium">Classes</span>):
    ''
  }
              </Link>
              <Link href='/admin/staff' className={pathName.startsWith('/admin/staff')?"flex items-center w-full h-10 px-3 mt-2 rounded text-[#272727] bg-gray-300":"flex items-center w-full h-10 px-3 mt-2 rounded hover:text-[#272727] hover:bg-gray-300"} >
                  <FaUsers className='w-[25px] h-[25px]' color='black'/>
        {show===true?
    (<span className="ml-2 text-sm font-medium">Staffs</span>):
    ''
  }
                  
              </Link>
              <Link href='/admin/transactions/studentsFee' className={pathName.startsWith('/admin/transactions')?"flex items-center w-full h-10 px-3 mt-2 rounded text-[#272727] bg-gray-300":"flex items-center w-full h-10 px-3 mt-2 rounded hover:text-[#272727] hover:bg-gray-300"} >
      <MdOutlinePayment className='w-[25px] h-[25px]' color='black'/>
      {show===true?
    (<span className="ml-2 text-sm font-medium">Transactions</span>):
    ''
  }
                  
              </Link>
              <Link href='/admin/student' className={pathName.startsWith('/admin/student')?"flex items-center w-full h-10 px-3 mt-2 rounded text-[#272727] bg-gray-300":"flex items-center w-full h-10 px-3 mt-2 rounded hover:text-[#272727] hover:bg-gray-300"} >
      <PiStudentFill className='w-[25px] h-[25px]' color='black'/>
      {show===true?
    (<span className="ml-2 text-sm font-medium">Student</span>):
    ''
  }
                  
              </Link>
              <Link href='/admin/visitor' className={pathName.startsWith('/admin/visitor')?"flex items-center w-full h-10 px-3 mt-2 rounded text-[#272727] bg-gray-300":"flex items-center w-full h-10 px-3 mt-2 rounded hover:text-[#272727] hover:bg-gray-300"} >
                  <FaPersonShelter className='w-[25px] h-[25px]' color='black'/>
        {show===true?
    (<span className="ml-2 text-sm font-medium">Visitors</span>):
    ''
  }
                  
              </Link>
              <Link href='/admin/admission' className={pathName==='/admin/admission'?"flex items-center w-full h-10 px-3 mt-2 rounded text-[#272727] bg-gray-300":"flex items-center w-full h-10 px-3 mt-2 rounded hover:text-[#272727] hover:bg-gray-300"} >
      {/* <span className="relative top-[-10px] left-0 w-2 h-2 ml-[-2px] bg-indigo-500 rounded-full"></span> */}
      <IoIosPersonAdd className='w-[25px] h-[25px]' color='black'/>
        {show===true?
    (<span className="ml-2 text-sm font-medium">Admission</span>):
    ''
  }
              </Link>
              <Link href='/admin/store/allProducts' className={pathName.startsWith('/admin/store')?"flex items-center w-full h-10 px-3 mt-2 rounded text-[#272727] bg-gray-300":"flex items-center w-full h-10 px-3 mt-2 rounded hover:text-[#272727] hover:bg-gray-300"} >
      {/* <span className="relative top-[-10px] left-0 w-2 h-2 ml-[-2px] bg-indigo-500 rounded-full"></span> */}
      <FaStore className='w-[25px] h-[25px]' color='black'/>
        {show===true?
    (<span className="ml-2 text-sm font-medium">Store</span>):
    ''
  }
              </Link>
          </div>
      </div>
      <div  className="flex flex-col items-center justify-center w-full h-16 mt-auto bg-gray-200 hover:text-[#272727] hover:bg-gray-300 cursor-pointer" onClick={()=>setIsModalOpen(true)}>
  <MdPassword className='w-[25px] h-[25px]' color='black'/>
    {show===true?
    (<span className="ml-2 text-sm font-medium">New Password</span>):
    ''
  }
      </div>
  </div>

  <Modal isOpen={isModalOpen} onClose={closeModal}>
    <div>
    <h1 className="text-[16px] text-black font-semibold px-[15px] pt-[5px] my-[10px]">
              Set New Password
            </h1>
            <>
                <div className="bg-[#f0f0f0] text-[black] p-[15px] text-[15px] font-sans">
                  Are your sure you want to change your password?
                  <strong> Note </strong>that your credientials to login as an 
                  <strong> admin </strong>on ABM Institute will be changed accordingly.
                  <div className="flex justify-between items-center mt-[10px]">
                    <div className="font-semibold mt-[5px] font-sans text-[16px]">
                      New Password:
                      {error ? (
                        <span className="text-[red] font-semibold text-[10px] ml-[5px]">
                          *Password must be at least 6 characters long
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="w-[90px] h-[30px] text-white rounded-md flex justify-center items-center font-semibold bg-[#a25dda] cursor-pointer"
                      onClick={generatePassword}
                    >
                      Generate
                    </div>
                  </div>
                  <div className="w-[100%] h-[40px] flex flex-row  items-center border-[2px] rounded-lg mt-[8px]">
                    <div className=" h-[30px] ml-[10px] flex flex-row items-center justify-center text-[#929292]">
                      <MdLockOutline size={25} />
                    </div>
                    <div className=" relative flex items-center w-[90%]">
                      <input
                        className="w-[100%] px-[10px] outline-none bg-transparent"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name=""
                        placeholder="Provide Password"
                      />
                      <div
                        className="absolute right-[1px] bottom-[2px] cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <FaEye size={20} />
                        ) : (
                          <FaEyeSlash size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white px-[10px]">
                  <div
                    className="w-[160px] my-[15px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer"
                    onClick={confirmPassword}
                  >
                    Confirm Password
                  </div>
                </div>
              </>
    </div>
  </Modal>
  </div>
  )
}

export default Sidebar
