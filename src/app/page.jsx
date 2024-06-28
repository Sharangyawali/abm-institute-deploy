import React from 'react'
import Navbar from './Components/NavBar'
import Link from 'next/link'

const page = () => {
  return (
    <div className='w-[100%] flex flex-col'>
      <Navbar/>
      <div className='flex justify-center items-center h-[80vh] w-full'>
        <Link href={'/login'}>
          <img src='/logo.jpeg'></img>
        </Link>
        </div>
    </div>
  )
}

export default page
