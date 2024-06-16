"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';

const TopBar = () => {
  const pathName = usePathname()

  return (
    <div className='w-[100%] h-[70px] flex bg-[#e6e6e6] justify-start px-[50px] gap-[30px] items-center'>
    <div className='text-[black] font-serif relative font-bold'>
      <Link href='/accountant/transactions/studentsFee'>Students Fee</Link>
      {pathName==='/accountant/transactions/studentsFee'?
      <div className='w-[80px] h-[5px] rounded-lg bg-[#a16db1] absolute top-[43px]'></div>
      :''
      }
     </div>
    <div className='text-[black] font-serif relative font-bold'>
      <Link href='/accountant/transactions/staffSalary'>Staff Salary</Link>
      {pathName==='/accountant/transactions/staffSalary'?
      <div className='w-[80px] h-[5px] rounded-lg bg-[#a16db1] absolute top-[43px]'></div>
      :''
      }
     </div>
    <div className='text-[black] font-serif relative font-bold'>
      <Link href='/accountant/transactions/otherCredits'>Other Credits</Link>
      {pathName==='/accountant/transactions/otherCredits'?
      <div className='w-[80px] h-[5px] rounded-lg bg-[#a16db1] absolute top-[43px]'></div>
      :''
      }
     </div>
    <div className='text-[black] font-serif relative font-bold'>
      <Link href='/accountant/transactions/otherDebits'>Other Debits</Link>
      {pathName==='/accountant/transactions/otherDebits'?
      <div className='w-[80px] h-[5px] rounded-lg bg-[#a16db1] absolute top-[43px]'></div>
      :''
      }
     </div>
    
  </div>
  )
}

export default TopBar
