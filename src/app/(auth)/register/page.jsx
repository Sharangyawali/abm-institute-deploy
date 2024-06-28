"use client"
import { CircularProgress } from '@mui/joy'
import Link from 'next/link'
import React,{useState} from 'react'
import toast from 'react-hot-toast'

const page = () => {
    const [data, setData] = useState({
        email: "",
        category: "",
        username: "",
        phoneNumber: "",
      })
      const[loading,setLoading]=useState(false)
      const[error,setError]=useState(false)
      const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({
          ...prev,
          [name]: value
        }))
      }
      const Roles = [
        { id: 1, label: "Frontdesk", value: "FrontDesk" },
        { id: 2, label: "Accountant", value: "Accounting" },
        { id: 3, label: "Teacher", value: "Teacher" },
      ]
  const rgexp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
      const register=async(e)=>{
        e.preventDefault();
        if(data.username.length<3||!rgexp.test(data.email)||data.category===''||data.phoneNumber.length!==10){
          setError(true)
        }
        else{
          setLoading(true)
          const name=data.username
          const email=data.email
          const phone=data.phoneNumber
          const role=data.category
          let result = await fetch(`/api/users/auth/register`, {
            method: "post",
            body: JSON.stringify({name,email,phone,role}),
            headers: { "Content-Type": "application/json" },
          });
          result = await result.json();
          setLoading(false)
          if (result.success === false) {
            toast.error(result.message)
          } 
          else{
            toast.success('Successfully Registered !! Contact to Admin for Verification')
          }
        }
      }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      {
        loading?
        <CircularProgress/>:

      <div className="max-w-md text-black w-full p-6 bg-white rounded-md shadow-md flex flex-col justify-evenly items-center">
  
            <h2 className="text-2xl text-black font-bold mb-4 w-[100%] text-center">Register</h2>
            <form className="w-[100%] flex flex-col justify-evenly items-center">
              <div className="mb-4 w-[80%]">
                <label
                  htmlFor="username"
                  className="  text-sm font-medium text-gray-600 inline"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleOnChange}
                  value={data.username}
                  className="mt-1 text-black p-2 w-full border rounded-md"
                />
                {error&&data.username.length<3?
                <span className='text-[red] text-[10px] font-semibold inline'>*Username cannot be less then 3 characters</span>
              :''  
              }
              </div>
              <div className="mb-4 w-[80%]">
                <label
                  htmlFor="phoneNumber"
                  className="block  text-sm font-medium text-gray-600"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={handleOnChange}
                  value={data.phoneNumber}
                  className="mt-1 text-black p-2 w-full border rounded-md"
                />
                 {error&&data.phoneNumber.length!==10?
                <span className='text-[red] text-[10px] font-semibold inline'>*PhoneNumber must be 10 characters long</span>
              :''  
              }
              </div>
              <div className="mb-4 w-[80%]">
                <label
                  htmlFor="email"
                  className="block  text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleOnChange}
                  value={data.email}
                  className="mt-1 text-black p-2 w-full border rounded-md"
                />
                     {error&&!rgexp.test(data.email)?
                <span className='text-[red] text-[10px] font-semibold inline'>*Enter a valid email</span>
              :''  
              }
              
              </div>

              <div className="mb-4 w-[80%]">
                <label htmlFor='category' className='block text-sm font-medium text-gray-600'>
                  Role :
                </label>
                <select required value={data.category} className='mt-1 border p-2 w-full rounded-md text-black' name='category' onChange={handleOnChange}>
                  <option value={""} >
                    Select Category
                  </option>
                  {
                    Roles.map((el, index) => {
                      return (
                        <option value={el.value} key={el.value + index}>
                          {el.label}
                        </option>
                      )
                    })
                  }
                </select>
                {error&&data.category===''?
                <span className='text-[red] text-[10px] font-semibold inline'>*Select a role</span>
              :''  
              }
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md hover:bg-gradient-to-l w-[80%]"
                onClick={register}
              >
                Register
              </button>
            </form>
            <p className="p-2">
              Already have an Account?
              <Link href='/login'
                className="px-2 text-blue-500 hover:text-red-400"
              >
                Login
              </Link>
            </p>
          </div>
      }
          </div>
  )
}

export default page
