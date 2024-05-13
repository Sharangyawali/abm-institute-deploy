"use client"
import { setLoadingFalse, setLoadingTrue } from "@/store/loadingShow/loadingShow";
import { CircularProgress } from "@mui/joy";
import { useRouter } from "next/navigation";
import React,{useState,useEffect} from "react";
import toast from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch } from "react-redux";
const page = () => {
  const dispatch=useDispatch()
  const router=useRouter()
  const [allUsers,setAllUsers]=useState([])
  const[latestUsers,setLatestUsers]=useState([])
  const [maxUsers,setMaxUsers]=useState([])
  const [alluserLoading,setAllUserLoading]=useState(true)
  useEffect(()=>{
    getAllUsers()
    getLatestUsers()
    getMaxUsers()

  },[])

  const getAllUsers=async()=>{
    let result = await fetch(`${process.env.API_VERCEL}api/front-desk/visitors`, {
      method: "get",
    });
    result = await result.json();
    if (result.success === false) {

      toast.error(result.message)
     router.push('/login')
    } 
    else{
      setAllUserLoading(false)
      setAllUsers(result.visitors)
    }
  }


  const getLatestUsers=async()=>{
    let result = await fetch(`${process.env.API_VERCEL}api/front-desk/getLatestVisitors`, {
      method: "get",
    });
    result = await result.json();
    if (result.success === false) {

      toast.error(result.message)
     router.push('/login')

    } 
    else{
      setLatestUsers(result.visitors)
    }
  }

  const getMaxUsers=async()=>{
    let result = await fetch(`${process.env.API_VERCEL}api/front-desk/getMaxVisitors`, {
      method: "get",
    });
    result = await result.json();
    if (result.success === false) {

      toast.error(result.message)
     router.push('/login')

    } 
    else{
      setMaxUsers(result.visitors)
    }
  }

  return (
    <div className="w-[100%] flex flex-col tablet:px-5 gap-[15px]">
      <div className="w-[100%] flex justify-start font-bold text-[19px] mt-[15px]">
        Front Desk Dashboard
      </div>
      <div className="w-[100%] flex flex-col laptop:flex-row justify-between ">
        {/* left side here */}
        <div className="w-[100%] laptop:w-[60%] h-[750px] shadow-xl rounded-lg flex flex-col py-[10px] mobile:px-[20px]">
          <div className="text-[15px] h-[50px] font-semibold flex">
            All Visitors
            <IoMdArrowDropdown className="ml-[8px]" size={25} />
          </div>
          <div className="w-[100%] mobile:ml-[10px] h-[700px] flex flex-col overflow-y-auto scrollbar-thin  scrollbar-thumb-[#420177] scrollbar-track-[#EBCBF5] ">
            {
              alluserLoading?
              <div className="w-[100%] h-[100%] flex items-center justify-center">
                <CircularProgress/>

              </div>
              :
                allUsers.length===0?
                <div className='text-[20px] font-semibold text-[#555555] m-auto '>All Visitors list here</div> 
                :
              
              allUsers.map((visitor)=>{
                let length=visitor.history.length;
               
                const date = new Date(visitor.history[length-1].time);
                const options = {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: false
                };
                const formattedDate = date.toLocaleDateString('en-GB', options);
                return(
              <div className="min-h-[100px] w-[100%] shadow-md rounded-md flex flex-col tablet:flex-row justify-between items-center px-[14px] gap-5" key={visitor._id}>
                <div className="flex w-[100%] tablet:w-[50%] gap-[40px] justify-between tablet:justify-start">
                  <div className="bg-[#d4d4d4] rounded-full ">
                    <img
                      className="w-[70px] h-[70px] rounded-full"
                      src={visitor.gender==='Female'?"/female.png":'/profile-demo.jpg'}
                    ></img>
                  </div>
                  <div className="h-[70px] flex flex-col items-start justify-center">
                    <div className="flex items-center ">
                      <div className="font-semibold text-[16px] ">
                        {visitor.firstName} {visitor.lastName}
                      </div>
                      <div className="w-[7px] h-[7px] rounded-full bg-[#5e5d5d] ml-[6px] mt-[2px]"></div>
                      <div className="font-medium text-[#969696] text-[12px] ml-[6px] mt-[2px]">
                        ({visitor.phone})
                      </div>
                    </div>
                    <div className="font-medium text-[14px]">
                      {visitor.streetAddress}, {visitor.city}, {visitor.state}
                    </div>
                  </div>
                </div>
  
                <div className="flex items-center justify-between tablet:justify-evenly w-[100%] tablet:w-[50%]">
                  <div className="h-[70px]  flex flex-col items-start justify-center ">
                    <div className="flex items-center ">
                      <div className="font-medium text-[15px] ">
                        Last visited on 
                      </div>
                    </div>
                    <div className="font-medium text-[14px]">{formattedDate}</div>
                  </div>
  
                  <div className="font-semibold w-[120px] h-[40px] rounded-xl flex items-center justify-center text-white hover:bg-[#c53fd1] bg-[#d46bdd] cursor-pointer">
                    View Detail
                  </div>
                </div>
              </div>
                )
  
              })}

              

            
            {/* Individual details from here */}
            {/* Individual details end here */}
          </div>
        </div>
        {/* left side ends here */}
        <div className="w-[100%] laptop:w-[35%] h-[750px]  flex flex-col justify-between  py-[10px] tablet:px-[20px]">
            {/* top visitors here */}

          <div className="w-[100%] h-[48%] shadow-xl rounded-lg felx flex-col px-[20px]">
            <div className="text-[15px] h-[40px] font-semibold ">
              Top Visitors
            </div>
            <div className="flex flex-col gap-2 justify-center mx-[20px] items-center">
              <div className="w-[100%] h-[90px] rounded-2xl bg-[#f8f8f8] shadow-lg flex justify-start items-center gap-3">
                <div className="h-[40px] w-[40px] ml-8 rounded-full">
                  <img
                    src="/user.png"
                    className="h-[100%] w-[100%] rounded-full"
                  ></img>
                </div>
                <div className="flex flex-col ml-[30px]">
                  <span className="font-bold text-[17px]">Ram Sharma</span>
                  <span className="text-[orange] font-semibold text-[13px]">
                    Visited <strong>18</strong> times
                  </span>
                </div>
              </div>

              <div className="w-[100%] h-[90px] rounded-2xl bg-[#f8f8f8] shadow-lg flex justify-start items-center gap-3">
                <div className="h-[40px] w-[40px] ml-8 rounded-full">
                  <img
                    src="/user.png"
                    className="h-[100%] w-[100%] rounded-full"
                  ></img>
                </div>
                <div className="flex flex-col ml-[30px]">
                  <span className="font-bold text-[17px]">Ram Sharma</span>
                  <span className="text-[orange] font-semibold text-[13px]">
                    Visited <strong>18</strong> times
                  </span>
                </div>
              </div>

              <div className="w-[100%] h-[90px] rounded-2xl bg-[#f8f8f8] shadow-lg flex justify-start items-center gap-3">
                <div className="h-[40px] w-[40px] ml-8 rounded-full">
                  <img
                    src="/user.png"
                    className="h-[100%] w-[100%] rounded-full"
                  ></img>
                </div>
                <div className="flex flex-col ml-[30px]">
                  <span className="font-bold text-[17px]">Ram Sharma</span>
                  <span className="text-[orange] font-semibold text-[13px]">
                    Visited <strong>18</strong> times
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* top visiotr ends here */}
          
          {/*  */}
          <div className="w-[100%] h-[48%] shadow-xl rounded-lg flex flex-col px-[20px]">
            
          <div className="text-[15px] h-[40px] font-semibold ">
              Recent Visitors
            </div>
            <div className="flex flex-col gap-2 justify-center mx-[20px] items-center">
              <div className="w-[100%] h-[90px] rounded-2xl bg-[#f8f8f8] shadow-lg flex justify-start items-center gap-3">
                <div className="h-[40px] w-[40px] ml-8 rounded-full">
                  <img
                    src="/female.png"
                    className="h-[100%] w-[100%] rounded-full"
                  ></img>
                </div>
                <div className="flex flex-col ml-[30px]">
                  <span className="font-bold text-[17px]">Ram Sharma</span>
                  <span className="text-[orange] font-semibold text-[13px]">
                    May 11, 2025 10:45 AM
                  </span>
                </div>
              </div>

              <div className="w-[100%] h-[90px] rounded-2xl bg-[#f8f8f8] shadow-lg flex justify-start items-center gap-3">
                <div className="h-[40px] w-[40px] ml-8 rounded-full">
                  <img
                    src="/female.png"
                    className="h-[100%] w-[100%] rounded-full"
                  ></img>
                </div>
                <div className="flex flex-col ml-[30px]">
                  <span className="font-bold text-[17px]">Ram Sharma</span>
                  <span className="text-[orange] font-semibold text-[13px]">
                  May 11, 2025 10:45 AM

                  </span>
                </div>
              </div>

              <div className="w-[100%] h-[90px] rounded-2xl bg-[#f8f8f8] shadow-lg flex justify-start items-center gap-3">
                <div className="h-[40px] w-[40px] ml-8 rounded-full">
                  <img
                    src="/female.png"
                    className="h-[100%] w-[100%] rounded-full"
                  ></img>
                </div>
                <div className="flex flex-col ml-[30px]">
                  <span className="font-bold text-[17px]">Ram Sharma</span>
                  <span className="text-[orange] font-semibold text-[13px]">
                  May 11, 2025 10:45 AM

                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
