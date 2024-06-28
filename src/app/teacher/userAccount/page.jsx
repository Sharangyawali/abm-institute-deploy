"use client";
import { CircularProgress } from "@mui/joy";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { RiPencilFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const page = () => {
  const router=useRouter()
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("Male");
  const [file,setFile]=useState('')
  const [selectedImage,setSelectedImage]=useState(null)
  useEffect(() => {
    getDetail();
  }, []);
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const getDetail = async () => {
    let result = await fetch(`/api/users/accountDetail`, {
      method: "get",
    });
    result = await result.json();
    setLoading(false);
    if (result.success === false) {
      router.push('/login')
      toast.error(result.message);
    } else {
      setDetail(result.detail);
      setSelectedImage(result.detail.teacher.profilePic)
      setStreetAddress(result.detail.teacher.streetAddress ?? "");
      setCity(result.detail.teacher.city ?? "");
      setState(result.detail.teacher.state ?? "");
      setGender(result.detail.teacher.gender ?? "Male");
    }
  };

  const handleSubmit=async()=>{
    const data=new FormData()
    data.set('file',file)
    data.set('streetAddress',streetAddress)
    data.set('city',city)
    data.set('state',state)
    data.set('gender',gender)
    setLoading(true)
    let result = await fetch(`/api/users/accountDetail`, {
        method: "post",
        body:data
      });
      result=await result.json()
      setLoading(false)
      if(result.success===false){
        if(result.message==='Account not found'){
          router.push('/login')
        }
        toast.error(result.message)
      }
      else{
        toast.success(result.message)
      }
  }

  return (
    <div className="w-[100%] flex justify-center items-center min-h-[700px]">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="w-[100%] tablet:w-[80%] flex flex-col laptop:flex-row justify-between items-center ">
          <div className="w-[100%] laptop:w-[39%] flex flex-col justify-center items-center gap-[20px] h-[200px] laptop:h-[600px] shadow-xl rounded-md bg-gradient-to-r from-[#f06273] to-[#f0936a] text-white font-bold text-[18px]">
            <div className="h-[80px] relative w-[80px] rounded-full bg-white">
            <img
                src={`${
                  selectedImage
                    ? selectedImage
                    : gender === "Male"
                    ? "/profile-demo.jpg"
                    : "/female.png"
                }`}
                className="h-[100%] w-[100%] rounded-full"
              />
              <div className="absolute top-[2px] w-[25px] h-[25px] bg-white rounded-full right-[0px] flex justify-center items-center">
                <label htmlFor="image">
                  <RiPencilFill size={20} color="black" />
                </label>
                <input
                  id="image"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    const imageUrl = URL.createObjectURL(e.target.files[0]);
                    setSelectedImage(imageUrl);
                  }}
                ></input>
              </div>
            </div>
            <span>{detail.name}</span>
            <span>Teacher</span>
          </div>
          <div className="w-[100%] laptop:w-[59%] flex flex-col h-[600px] shadow-xl rounded-md justify-evenly px-[10px] ">
            <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
              Information
              <hr></hr>
            </div>
            <div className="flex flex-col tablet:flex-row w-[100%] justify-start gap-[10px] tablet:gap-0">
              <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
                <span className="font-semibold text-[18px]">Email</span>
                <span className=" text-[16px]">{detail.email}</span>
              </div>
              <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
                <span className="font-semibold text-[18px]">Phone</span>
                <span className=" text-[16px]">{detail.phone}</span>
              </div>
            </div>
            <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
              Address
              <hr></hr>
            </div>
            <div className="flex flex-col tablet:flex-row  w-[100%] justify-start gap-[10px] tablet:gap-0">
              <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
                <span className="font-semibold text-[18px]">StreetAddress</span>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className={`mt-1 text-black p-2 w-[95%] border rounded-md`}
                />
              </div>
              <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
                <span className="font-semibold text-[18px]">City</span>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`mt-1 text-black p-2 w-[95%] border rounded-md`}
                />
              </div>
            </div>
            <div className="flex flex-col tablet:flex-row  w-[100%] justify-start gap-[10px] tablet:gap-0">
              <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
                <span className="font-semibold text-[18px]">State</span>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={`mt-1 text-black p-2 w-[95%] border rounded-md`}
                />
              </div>
            </div>
            <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
              Gender
              <hr></hr>
            </div>
            <div className="flex  w-[100%] justify-start gap-[10px] ">
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={handleGenderChange}
              />
              <label htmlFor="male">Male</label>
              <input
                className="ml-[6px]"
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={handleGenderChange}
              />
              <label htmlFor="female">Female</label>
              <input
                className="ml-[6px]"
                type="radio"
                id="other"
                name="gender"
                value="Other"
                checked={gender === "Other"}
                onChange={handleGenderChange}
              />
              <label htmlFor="other">Other</label>
            </div>

            <div className="w-[100%] flex justify-center  text-[18px] font-semibold ">
              <div className="text-white bg-[#5a215a] flex justify-center items-center w-[90px] h-[40px] rounded-sm cursor-pointer hover:bg-[#a540a5]" onClick={handleSubmit}>
                <span>Submit</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
