"use client";
import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { MdAccountCircle } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaBell } from "react-icons/fa6";
import Link from "next/link";
import { AiFillCloseCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { MdLockOutline } from "react-icons/md";
import generator from 'generate-password'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast'
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector} from "react-redux";
import { setLoadingTrue,setLoadingFalse } from "@/store/loadingShow/loadingShow";
import { fetchVisitorsData,fetchAccountantData,fetchFrontDeskData,fetchStudentData,fetchTeacherData } from "@/store/employeesDetails/employeesDetailsThunk";
const Navbar = () => {
  const router = useRouter();
  const dispatch=useDispatch()
  const [language, setLanguage] = useState(false);
  const [flag, setFlag] = useState("usa");
  const [showNoti, setShowNoti] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const[error,setError]=useState(false)
  const[loading,setLoading]=useState(false)
  const[acceptModal,setAcceptModal]=useState(false)
  const[declineModal,setDeclineModal]=useState(false)
  const [search,setSearch]=useState('')
  const [users,setUsers]=useState([])
  const [searchShow,setSearchShow]=useState(false)
const [result,setResult]=useState([])

  const teachers = useSelector((state) => state.employeeDetails.teachers);
  const frontDesk = useSelector((state) => state.employeeDetails.frontDesks);
  const accountant = useSelector((state) => state.employeeDetails.accountants);
  const visitors = useSelector((state) => state.employeeDetails.visitors);
  const student=useSelector((state)=>state.employeeDetails.students);

  useEffect(() => {
    getNotifications();
    if (teachers.length === 0) {
      dispatch(fetchTeacherData());
    }
    if (accountant.length === 0) {
      dispatch(fetchAccountantData());
    }
    if (frontDesk.length === 0) {
      dispatch(fetchFrontDeskData());
    }
    if(visitors.length===0){
      dispatch(fetchVisitorsData())
    }
    if(student.length===0){
      dispatch(fetchStudentData())
    }
    
  }, [dispatch]);


  useEffect(()=>{
    let details=[]
    const teacherDetail=teachers.map((teachers,index)=>({
      ...teachers,role:'teacher'
    }))
    const frontDeskDetail=frontDesk.map((fd,index)=>({
      ...fd,role:'frontDesk'
    }))
    const accountantDetail=accountant.map((acc,index)=>({
      ...acc,role:'accountant'
    }))
    const studentsDetails=student.map((stud,index)=>({
      ...stud,role:'student'
    }))
    const visitorDetails=visitors.map((vst,index)=>({
      ...vst,role:'visitor'
    }))
    details=[...details,...teacherDetail,...frontDeskDetail,...accountantDetail,...studentsDetails,...visitorDetails]
    setUsers(details)
  },[teachers,frontDesk,accountant,visitors,student])

  const getNotifications = async () => {
    console.log("called ");
    let result = await fetch(`/api/admin/requestedUser`, {
      method: "get",
    });
    result = await result.json();
    console.log(result);
    if (result.success === false) {
      router.push("/login");
    } else {
      if (result.users) {
        setNotifications(result.users);
      }
    }
  };

  const closeModal = () => setIsModalOpen(false);
  const acceptRequest = (user) => setUser(user);
  const rejectRequest=(user)=>setUser(user);
  const generatePassword=()=>{
    var password = generator.generate({
      length: 10,
      numbers: true,
      uppercase:true
    });
    setPassword(password)
  }

  const verifyUser=async()=>{
    if(password.length<6){
      setError(true)
    }
    else{
      if(user.id){
        dispatch(setLoadingTrue())
        let result = await fetch(`/api/admin/verifyUser`, {
        method: "post",
        body: JSON.stringify({id:user.id,password:password}),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      dispatch(setLoadingFalse())
      if (result.success === false) {
        toast.error(result.message)
      } 
      else{
        setIsModalOpen(false)
        toast.success(result.message)
      }
      }
    }
  }

  const handleSearch=(val)=>{
    setSearch(val)
    if(val.length>0){
      const showingAre=[]
      users.forEach((emp,index)=>{
        const value=val.toLowerCase()
        if(emp.firstName&&emp.lastName&&emp.role==='visitor'){
         const name=`${emp.firstName} ${emp.lastName}`
         const nameToLower=name.toLowerCase()
         if(value && nameToLower.includes(value)){
           showingAre.push ({name:name,role:'visitor',detail:emp})
         }
       }
       else if(emp.firstName && emp.lastName&&emp.role==='student'){
         const name=`${emp.firstName} ${emp.lastName}`
         const nameToLower=name.toLowerCase()
         if(value && nameToLower.includes(value)){
           showingAre.push ({name:name,role:'student',detail:emp})
         }
       }
        else if(emp.name && emp.role ){
          const name=emp.name.toLowerCase()
          if(value && name.includes(value)){
            showingAre.push({name:emp.name,role:emp.role,detail:emp})
          }
        }
      })
      if(showingAre&&showingAre.length>0){
        setSearchShow(true)
      }
      setResult(showingAre)
      console.log(showingAre)
    }
    else{
      setResult([])
    }
      }


      const handleOnClick=()=>{
        setSearchShow(false)
        setResult([])
      }
      
  const rejectUser=async()=>{
      if(user.id){
        dispatch(setLoadingTrue())
        let result = await fetch(`/api/admin/rejectUser`, {
        method: "post",
        body: JSON.stringify({id:user.id}),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      dispatch(setLoadingFalse())
      if (result.success === false) {
        toast.error(result.message)
      } 
      else{
        setIsModalOpen(false)
        toast.success(result.message)
      }
      }
  }

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
    <div className="flex flex-row w-[100%] h-[7vh] bg-white items-center pl-[40px] justify-between">
      
      <div className="flex flex-row items-center px-[-40px] gap-[30px]">
      
      </div>
      <div className="w-[50%] relative tablet:w-[40%] laptop:w-[30%] h-[40px] flex flex-row justify-center items-center border-[2px] rounded-2xl px-[10px]">
        <div className="flex items-center w-[80%]">
          <input
            className="w-[100%] px-[10px] outline-none"
            type="text"
            name="search"
            value={search}
            onChange={(e)=>handleSearch(e.target.value)}
            placeholder="Search anyone here"
          />
        </div>
        <div className="w-[13%] h-[30px] flex flex-row items-center justify-center">
          <button className="w-[80%]">
            <GoSearch size={25} />
          </button>
        </div>

{
  searchShow&&(
        <div className="absolute px-[5px] max-h-[300px] rounded-2xl z-[99] bg-white w-[100%]  top-[45px] flex flex-col gap-[8px] overflow-y-scroll scrollbar-thin  scrollbar-thumb-[#420177] ">
          {result.map((res,index)=>{
            return(
          <Link href={`${(res.role==='accountant'||res.role==='frontDesk'||res.role==='teacher')?`/admin/staff/${res.role}/${res.detail.id}`:`/admin/${res.role}/${res.detail.id}`}`} className="w-[100%]  min-h-[100px] bg-white text-black  rounded-xl shadow-lg hover:bg-[#f0f0f0] shadow-[#dddddd] flex items-center tablet:px-[20px] justify-between" key={index} onClick={handleOnClick}>
        <div className="bg-[#d4d4d4] rounded-full ">
            <img
              className="w-[50px] h-[50px] rounded-full"
              src="/profile-demo.jpg"
            ></img>
          </div>
          <div className="text-[15px] text-ellipsis text-black w-[80%] relative flex flex-col">
            <strong>{res.name}</strong>
            <span className="text-[12px] font-bold capitalize">{res.role}</span>
          </div>
        </Link>

            )
          })}

          </div>

  )
}




      </div>
      <div className="flex flex-row items-center justify-end gap-[10%]">
        <div
          className="flex flex-row cursor-pointer"
          onClick={() => setShowNoti(!showNoti)}
        >
          <FaBell
            className="w-[18px] h-[18px] tablet:w-[35px] tablet:h-[35px]"
            color="black"
          />
          <div className="bg-[red] rounded-full tablet:h-[16px] px-[5px] ml-[-12px] text-[10px]">
            <span className="text-white">{notifications.length>9?'+9':notifications.length}</span>
          </div>
        </div>
        <div>
          <IoLogOut
            className="w-[25px] h-[25px] tablet:w-[40px] tablet:h-[40px] cursor-pointer"
            size={25}
            color="black"
            onClick={handleLogout}
          />
        </div>
      </div>
      {showNoti ? (
        <div className="w-[100%] p-[10px] tablet:p-0 tablet:w-[500px] bg-white  absolute top-[7vh] z-[99] right-[1%] rounded-2xl">
          <div className="w-[100%] bg-white h-[40px] text-black font-bold text-[20px] ">
            Notification
          </div>
          <hr className="text-black font-semibold"></hr>
          <div className=" px-[5px] my-[10px] w-[100%] tablet:w-[480px] h-[480px]  flex flex-col gap-[8px] overflow-y-scroll scrollbar-thin  scrollbar-thumb-[#420177] scrollbar-track-[#EBCBF5] ">
            {notifications.length==0?
            (
              <div className="font-semibold self-center my-auto ">
                Notification Will be Shown Here
              </div>
            )
            :""
            }
            
            {notifications.map((noti, index) => {
              return (
                <div
                  className="w-[100%]  min-h-[100px] bg-white text-black  rounded-xl shadow-lg hover:bg-[#f0f0f0] shadow-[#dddddd] flex items-center tablet:px-[20px] justify-between"
                  key={noti._id}
                >
                  <div className="bg-[#d4d4d4] rounded-full ">
                    <img
                      className="w-[50px] h-[50px] rounded-full"
                      src="/profile-demo.jpg"
                    ></img>
                  </div>
                  <div className="text-[15px] text-ellipsis text-black w-[80%] relative">
                    A new request from <strong>{noti.name}</strong> for the role
                    of <strong>{noti.role}</strong> is received.
                    <AiFillCheckCircle
                      className="ml-[10px] cursor-pointer inline"
                      color="green"
                      size={30}
                      onClick={() => {
                        acceptRequest(noti);
                        setIsModalOpen(true);
                        setAcceptModal(true)
                        setDeclineModal(false)
                      }}
                    />
                    <AiFillCloseCircle
                      className="ml-[20px] cursor-pointer inline"
                      color="red"
                      size={30}
                      onClick={() => {
                        rejectRequest(noti);
                        setIsModalOpen(true);
                        setDeclineModal(true)
                        setAcceptModal(false)
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
      {acceptModal&&!declineModal?
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          <h1 className="text-[16px] text-black font-semibold px-[15px] pt-[5px] my-[10px]">
            Handling Request
          </h1>
          {user ? (
            <>
            <div className="bg-[#f0f0f0] text-[black] p-[15px] text-[15px] font-sans">
              Are your sure you want to accept the request from{" "}
              <strong>{user.name}</strong> applying for{" "}
              <strong>{user.role} </strong>
              via phone number
              <strong> {user.phone}</strong>
              and email
              <strong> {user.email}</strong> ? If so you need to provide
              password to the user and verify the user. You can provide the
              password down below either by typing by directly by clicking generate button!!
              <div className="flex justify-between items-center mt-[10px]">
                <div className="font-semibold mt-[5px] font-sans text-[16px]">
                  Password:
                  {error?
                  <span className="text-[red] font-semibold text-[10px] ml-[5px]">*Password must be at least 6 characters long</span>
                :''  
                }
                </div>
                <div className="w-[90px] h-[30px] text-white rounded-md flex justify-center items-center font-semibold bg-[#a25dda] cursor-pointer" onClick={generatePassword}>
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
                    {showPassword ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white px-[10px]">
              <div className="w-[120px] my-[15px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer" onClick={verifyUser}>Verify User</div>
            </div>
            </>
          ) : (
            ""
          )}
        </div>
      </Modal>
      :''
    }
     {declineModal&&!acceptModal?
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          <h1 className="text-[16px] font-semibold px-[15px] pt-[5px] my-[10px]">
            Handling Request
          </h1>
          {user ? (
            <>
            <div className="bg-[#f0f0f0] p-[15px] text-[15px] font-sans">
              Are your sure you want to decline the request from{" "}
              <strong>{user.name}</strong> applying for{" "}
              <strong>{user.role} </strong>
              via phone number
              <strong> {user.phone}</strong>
              and email
              <strong> {user.email}</strong> ? If so click the button down here to decline the request and reject the verification process!!
            </div>
            <div className="bg-white px-[10px]">
              <div className="w-[150px] my-[15px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer" onClick={rejectUser}>Decline Request</div>
            </div>
            </>
          ) : (
            ""
          )}
        </div>
      </Modal>
      :''
    }
    
    </div>
  );
};

export default Navbar;
