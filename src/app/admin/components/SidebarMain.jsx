"use client"
import React,{useState} from 'react'
import { FaBars } from "react-icons/fa";
import Sidebar from './Sidebar';

const SidebarMain = () => {
    const [sidebar,setSidebar]=useState(false)
  const toogelSidebar=()=>{
    setSidebar(!sidebar)
  }
  return (
      <div className={sidebar===true?`w-[15%]`:`w-[60px]`}>
            <div className='flex flex-row w-[100%] h-[93vh]'>
                <Sidebar show={sidebar} className={sidebar===true?`w-[90%]`:`w-[90px]`}/>
                <div type='button' className='absolute hidden top-[3px] left-[10px] w-[50px] h-[50px] bg-[white] tablet:flex items-center justify-center cursor-pointer' onClick={toogelSidebar}>
                    <FaBars className='w-[20px] h-[20px]' color='black' />
                </div>
            </div>
        </div>
  )
}

export default SidebarMain
