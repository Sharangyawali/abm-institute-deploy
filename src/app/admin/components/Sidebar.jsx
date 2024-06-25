"use client"
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { GiCube } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { SlDocs } from "react-icons/sl";
import { LuMessagesSquare } from "react-icons/lu";
import { MdAccountCircle } from "react-icons/md";
import { FaPersonShelter } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlinePayment } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { IoIosPersonAdd } from "react-icons/io";
import { FaStore } from "react-icons/fa";
const Sidebar = ({show}) => {
  const pathName = usePathname()
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
      {/* <Link href='/account' className="flex items-center justify-center w-full h-16 mt-auto bg-gray-200 hover:text-[#272727] hover:bg-gray-300">
  <IoIosPersonAdd className='w-[25px] h-[25px]' color='black'/>
    {show===true?
    (<span className="ml-2 text-sm font-medium">Account</span>):
    ''
  }
      </Link> */}
  </div>
  </div>
  )
}

export default Sidebar
