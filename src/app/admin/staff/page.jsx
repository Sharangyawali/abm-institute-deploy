"use client";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete, MdLockOutline } from "react-icons/md";
import {
  fetchAccountantData,
  fetchFrontDeskData,
  fetchTeacherData,
} from "@/store/employeesDetails/employeesDetailsThunk";
import generator from 'generate-password'
import { setLoadingFalse, setLoadingTrue } from "@/store/loadingShow/loadingShow";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "../components/Modal";
import { useRouter } from "next/navigation";

const Page = () => {
  const router=useRouter()
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.employeeDetails.teachers);
  const frontDesk = useSelector((state) => state.employeeDetails.frontDesks);
  const accountant = useSelector((state) => state.employeeDetails.accountants);
  const [selectedRole, setSelectedRole] = useState("Accountant");
  const [showOptions, setShowOptions] = useState(false);
  const[passwordModal,setPasswordModal]=useState(false)
  const[deleteModal,setDeleteModal]=useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user,setUser]=useState()
  const [showPassword, setShowPassword] = useState("");
  const [password, setPassword] = useState("");
  const[error,setError]=useState(false)

  useEffect(() => {
    if (teachers.length === 0) {
      dispatch(fetchTeacherData());
    }
    if (accountant.length === 0) {
      dispatch(fetchAccountantData());
    }
    if (frontDesk.length === 0) {
      dispatch(fetchFrontDeskData());
    }
  }, [dispatch]);

  const handleChangeRole = (roleValue) => {
    setSelectedRole(roleValue);
    setShowOptions(false);
  };

  const closeModal = () => setIsModalOpen(false);
  const changePassword = (user) =>{
    console.log(user)
    setUser(user);

  } 
  const deleteAccount=(user)=>setUser(user);

  const roles = [
    { name: "Accountant", value: "Accountant" },
    { name: "FrontDesk", value: "FrontDesk" },
    { name: "Teacher", value: "Teacher" },
  ];

  const generatePassword=()=>{
    var password = generator.generate({
      length: 10,
      numbers: true,
      uppercase:true
    });
    setPassword(password)
  }

  const confirmPassword=async()=>{
    if(password.length<6){
      setError(true)
    }
    else{
      if(user.user.id){
        dispatch(setLoadingTrue())
        let result=await fetch('/api/admin/changePassword',{
          method:'post',
          body:JSON.stringify({userId:user.user.id,password:password}),
        headers: { "Content-Type": "application/json" },
        })
        result = await result.json();
        dispatch(setLoadingFalse())
        if (result.success === false) {
          setIsModalOpen(false)
          toast.error(result.message)
        } 
        else{
          setIsModalOpen(false)
        toast.success(result.message)
        }
      }
    }
  }


  const confirmDeleteAccount=async()=>{
    if(user.user.id && user.id){
      dispatch(setLoadingTrue())
      let result = await fetch(`/api/admin/deleteAccount`, {
        method: "post",
        body: JSON.stringify({userId:user.user.id,accountId:user.id}),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      dispatch(setLoadingFalse())
      if (result.success === false) {
        setIsModalOpen(false)
        toast.error(result.message)
      } 
      else{
        setIsModalOpen(false)
        toast.success(result.message)
      }
    }
  }

  return (
    <div className="w-[100%] flex justify-center items-center">
      <div className="w-[100%] laptop:w-[90%] h-[800px]  flex flex-col justify-start  shadow-2xl">
        <div className="w-[100%] px-[20px] flex justify-between">
          <div className="relative text-[15px] flex flex-col h-[50px] font-semibold w-[125px]">
            <div
              className="flex justify-between items-center w-[100%]"
              onClick={() => setShowOptions(!showOptions)}
            >
              <div>{selectedRole}</div>
              <IoMdArrowDropdown className="ml-[8px]" size={25} />
            </div>
            {showOptions && (
              <div className="absolute h-[100px] top-[30px] w-[135px] flex flex-col justify-start rounded-md bg-[#e9e9e9] z-[99] right-[0px]">
                {roles.map((role, index) => (
                  <div
                    className="w-[100%] h-[33px] text-black border-[#3a3a3a] hover:bg-[#cecdcd] tablet:px-[5px] flex justify-start cursor-pointer"
                    key={index}
                    onClick={() => handleChangeRole(role.value)}
                  >
                    {role.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-[100%] h-[650px]  laptop:px-[10px] overflow-x-scroll scrollbar-thin  scrollbar-thumb-[#420177]">
          <table className="w-[100%] text-sm text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-[#f3f3f3] flex">
              <tr className="min-w-[100%] flex bg-[#f3f3f3]">
                <th scope="col" className="px-4 py-2 w-[25%]">
                  SN
                </th>
                <th scope="col" className="px-4 py-2 w-[25%]">
                  Name
                </th>
                <th scope="col" className="px-4 py-2 w-[25%]">
                  Role
                </th>
                <th scope="col" className="px-4 py-2 w-[25%]">
                  Phone
                </th>
                <th scope="col" className="px-4 py-2 w-[25%]">
                  Address
                </th>
                <th scope="col" className="px-4 py-2 w-[25%]">
                  email
                </th>
                <th scope="col" className="px-4 py-2 w-[25%]">
                  Password
                </th>
                <th scope="col" className="px-4 py-2 w-[10%]">
                </th>
              </tr>
            </thead>
            <tbody className="h-[350px] w-full overflow-y-scroll scrollbar-thin  scrollbar-thumb-[#420177] flex flex-col">
                    {selectedRole==='Accountant'?
                    accountant.map((acc,index)=>{
                      return(
                        <tr className="bg-white border-b min-w-[100%] flex cursor-pointer hover:bg-[#d6d6d6]" key={index} style={{ minHeight: "40px" }} >
                            <td  className="px-4 py-2 w-[25%] text-center"  onClick={()=>{router.push(`/admin/staff/accountant/${acc.id}`)}}>{index+1}</td>
                            <td className="px-4 py-2 w-[25%]  text-center"  onClick={()=>{router.push(`/admin/staff/accountant/${acc.id}`)}}>{acc.name}</td>
                            <td className="px-4 py-2 w-[25%]  text-center"  onClick={()=>{router.push(`/admin/staff/accountant/${acc.id}`)}}>Accounting</td>
                            <td className="px-4 py-2 w-[25%]  text-center"  onClick={()=>{router.push(`/admin/staff/accountant/${acc.id}`)}}>{acc.phone}</td>
                            <td className="px-4 py-2 w-[25%] text-wrap  text-center"  onClick={()=>{router.push(`/admin/staff/accountant/${acc.id}`)}}>{acc.streetAddress!==null?`${acc.streetAddress},`:''}{acc.state!==null?`${acc.state},`:''}{acc.city!==null?`${acc.city}`:''}</td>
                            <td className="px-4 py-2 w-[25%]  text-center"  onClick={()=>{router.push(`/admin/staff/accountant/${acc.id}`)}}>{acc.email}</td>
                            <td className="px-4 py-2 w-[25%]  flex justify-center items-center">
                              <div className="bg-[#783e99] w-[90%] h-[160%] text-white flex justify-center items-center cursor-pointer hover:bg-[#ad42eb]" 
                              onClick={()=>{
                                changePassword(acc);
                                setIsModalOpen(true);
                                setPasswordModal(true);
                                setDeleteModal(false);
                              }}
                              >Set New Password</div>
                            </td>
                            <td className="px-4 py-2 w-[10%]  text-center"><MdDelete size={24} color="red" className="cursor-pointer"
                            onClick={()=>{
                              deleteAccount(acc);
                              setIsModalOpen(true);
                              setPasswordModal(false);
                              setDeleteModal(true)
                            }}
                            /></td>
                        </tr>
                      )
                    })
                    
                :selectedRole==='Teacher'?
                teachers.map((acc,index)=>{
                  return(
                    <tr className="bg-white border-b min-w-[100%] flex cursor-pointer hover:bg-[#d6d6d6]" key={index} style={{ minHeight: "40px" }}>
                    <td  className="px-4 py-2 w-[25%] text-center"  onClick={()=>{router.push(`/admin/staff/teacher/${acc.id}`)}}>{index+1}</td>
                    <td className="px-4 py-2 w-[25%]  text-center"  onClick={()=>{router.push(`/admin/staff/teacher/${acc.id}`)}}>{acc.name}</td>
                    <td className="px-4 py-2 w-[25%]  text-center"  onClick={()=>{router.push(`/admin/staff/teacher/${acc.id}`)}}>Teacher</td>
                    <td className="px-4 py-2 w-[25%]  text-center"  onClick={()=>{router.push(`/admin/staff/teacher/${acc.id}`)}}>{acc.phone}</td>
                    <td className="px-4 py-2 w-[25%] text-wrap  text-center"  onClick={()=>{router.push(`/admin/staff/teacher/${acc.id}`)}}>{acc.streetAddress!==null?`${acc.streetAddress},`:''}{acc.state!==null?`${acc.state},`:''}{acc.city!==null?`${acc.city}`:''}</td>
                    <td className="px-4 py-2 w-[25%]  text-center"  onClick={()=>{router.push(`/admin/staff/teacher/${acc.id}`)}}>{acc.email}</td>
                    <td className="px-4 py-2 w-[25%]  flex justify-center items-center">
                      <div className="bg-[#783e99] w-[90%] h-[160%] text-white flex justify-center items-center cursor-pointer hover:bg-[#ad42eb]" 
                      onClick={()=>{
                        changePassword(acc);
                        setIsModalOpen(true);
                        setPasswordModal(true);
                        setDeleteModal(false);
                      }}
                      >Set New Password</div>
                    </td>
                    <td className="px-4 py-2 w-[10%]  text-center"><MdDelete size={24} color="red" className="cursor-pointer"
                    onClick={()=>{
                      deleteAccount(acc);
                      setIsModalOpen(true);
                      setPasswordModal(false);
                      setDeleteModal(true)
                    }}
                    /></td>
                </tr>
                  )
                })
                :
                selectedRole==='FrontDesk'?
                frontDesk.map((acc,index)=>{
                  return(
                    <tr className="bg-white border-b min-w-[100%] flex cursor-pointer hover:bg-[#d6d6d6]" key={index} style={{ minHeight: "40px" }} >
                    <td  className="px-4 py-2 w-[25%] text-center" onClick={()=>{router.push(`/admin/staff/frontDesk/${acc.id}`)}}>{index+1}</td>
                    <td className="px-4 py-2 w-[25%]  text-center" onClick={()=>{router.push(`/admin/staff/frontDesk/${acc.id}`)}}>{acc.name}</td>
                    <td className="px-4 py-2 w-[25%]  text-center" onClick={()=>{router.push(`/admin/staff/frontDesk/${acc.id}`)}}>FrontDesk</td>
                    <td className="px-4 py-2 w-[25%]  text-center" onClick={()=>{router.push(`/admin/staff/frontDesk/${acc.id}`)}}>{acc.phone}</td>
                    <td className="px-4 py-2 w-[25%] text-wrap  text-center" onClick={()=>{router.push(`/admin/staff/frontDesk/${acc.id}`)}}>{acc.streetAddress!==null?`${acc.streetAddress},`:''}{acc.state!==null?`${acc.state},`:''}{acc.city!==null?`${acc.city}`:''}</td>
                    <td className="px-4 py-2 w-[25%]  text-center" onClick={()=>{router.push(`/admin/staff/frontDesk/${acc.id}`)}}>{acc.email}</td>
                    <td className="px-4 py-2 w-[25%]  flex justify-center items-center">
                      <div className="bg-[#783e99] w-[90%] h-[160%] text-white flex justify-center items-center cursor-pointer hover:bg-[#ad42eb]" 
                      onClick={()=>{
                        changePassword(acc);
                        setIsModalOpen(true);
                        setPasswordModal(true);
                        setDeleteModal(false);
                      }}
                      >Set New Password</div>
                    </td>
                    <td className="px-4 py-2 w-[10%]  text-center"><MdDelete size={24} color="red" className="cursor-pointer"
                    onClick={()=>{
                      deleteAccount(acc);
                      setIsModalOpen(true);
                      setPasswordModal(false);
                      setDeleteModal(true)
                    }}
                    /></td>
                </tr>

                  )
                }):
                ''}
                
            </tbody>
          </table>
          {/* Content related to the selected role can go here */}
        </div>

      </div>
      {passwordModal&&!deleteModal?
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div>
      <h1 className="text-[16px] text-black font-semibold px-[15px] pt-[5px] my-[10px]">
            Set New Password
          </h1>
          {user?
          (
            <>
            <div className="bg-[#f0f0f0] text-[black] p-[15px] text-[15px] font-sans">
            Are your sure you want to change the password of{" "}
            <strong>{user.name}</strong> currently working as a{" "}
            <strong>{user.user.role} </strong> on ABM Institute.
            <div className="flex justify-between items-center mt-[10px]">
                <div className="font-semibold mt-[5px] font-sans text-[16px]">
                  New Password:
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
              <div className="w-[160px] my-[15px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer" onClick={confirmPassword}>Confirm Password</div>
            </div>
            </>
          )
          :''}
        </div>

    </Modal> 
     :''
    }
      {deleteModal&&!passwordModal?
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div>
      <h1 className="text-[16px] text-black font-semibold px-[15px] pt-[5px] my-[10px]">
            Delete Account
          </h1>
          {user ? (
            <>
            <div className="bg-[#f0f0f0] p-[15px] text-[15px] font-sans">
              Are your sure you want to delete the account of{" "}
              <strong>{user.name}</strong> currently working as{" "}
              <strong>{user.user.role} </strong> in ABM Institute with phone number
              <strong> {user.phone}</strong>
              and email
              <strong> {user.email}</strong> ? If so click the button down here to delete the account!!
            </div>
            <div className="bg-white px-[10px]">
              <div className="w-[150px] my-[15px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer" onClick={confirmDeleteAccount} >Delete Account</div>
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

export default Page;
