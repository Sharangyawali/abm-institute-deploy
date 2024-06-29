"use client";
import { CircularProgress } from "@mui/joy";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
const page = () => {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [search,setSearch]=useState('')
  const [show,setShow]=useState(false)
  const [result,setResult]=useState([])
  useEffect(() => {
    getStore();
  }, []);

  useEffect(() => {
    let i;
    let pages = [];
    for (i = 1; i <= Math.ceil(total / 8); i++) {
      pages.push(i);
    }
    setPageNumbers(pages);
  }, [total]);

  const getStore = async () => {
    let result = await fetch(`/api/admin/store`, {
      method: "get",
    });
    result = await result.json();
    setLoading(false);
    if (result.success === false) {
      toast.error(result.message);
    } else {
      setStore(result.store);
      setTotal(result.store.length)
    }
  };

  const handleSearch=(val)=>{
    setSearch(val)
    if(val.length>0){
      const showingAre=[]
      store.forEach((st,index)=>{
        const value=val.toLowerCase()
          const name=st.name.toLowerCase()
          if(value && name.includes(value)){
            showingAre.push({detail:st})
          }
        
      })
      if(showingAre&&showingAre.length>0){
        setShow(true)
      }
      setResult(showingAre)
    }
    else{
      setResult([])
    }
      }
    
    
    const handleOnClick=()=>{
      setShow(false)
      setResult([])
    }
  return (
    <div className="w-[100%] flex justify-center items-center">
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : (
        <div className="w-[100%] flex flex-col">
          <div className="w-[100%] flex justify-end items-center mt-[20px] px-[20px]">
          <div className="relative h-[40px]  laptop:w-[20%] flex flex-row justify-center items-center bg-[#dfdede] rounded-lg">
      <div className="flex items-center w-[80%]">
        <input
          className=" w-[100%] px-[5px] outline-none bg-[#dfdede] "
          type="text"
          value={search}
          onChange={(e)=>handleSearch(e.target.value)}
          name="search"
          placeholder="Search items here"
        />
      </div>
      <div className="w-[13%] h-[30px] flex flex-row items-center justify-center">
        <button className="w-[80%]">
          <GoSearch size={25} className="" />
        </button>
      </div>
      {
        show&&(
      <div className="absolute px-[5px] max-h-[300px] rounded-2xl z-[99] bg-white w-[100%] laptop:top-[63px] top-[85px] flex flex-col gap-[8px] overflow-y-scroll scrollbar-thin  scrollbar-thumb-[#420177] ">
        {result.map((res,index)=>{
          return(
        <Link href={`/admin/store/detail/${res.detail.id}`} className="w-[100%]  min-h-[100px] bg-white text-black  rounded-xl shadow-lg hover:bg-[#f0f0f0] shadow-[#dddddd] flex items-center tablet:px-[20px] justify-between" key={index} onClick={handleOnClick}>
          <div className="bg-[#d4d4d4] rounded-full ">
            <img
              className="w-[50px] h-[50px] rounded-full"
              src={`${res.detail.picture?res.detail.picture:'/store.jpeg'}`}
            ></img>
          </div>
          <div className="text-[15px] text-ellipsis text-black w-[80%] relative flex flex-col">
            <strong>{ res.detail.name}</strong>
            <span className="text-[12px] font-bold">NRP{res.detail.sellPrice}</span>
          </div>
        </Link>
          )
        })}
      </div>
        )
      }
    </div>
          </div>

          <div className="w-[100%] flex flex-wrap py-[30px] px-[30px] gap-[5%] min-h-[600px] laptop:gap-[3%] desktop:gap-[2%]">
            {store.map((st, index) => {
              if(((index+1)>(page-1)*8)&&((index+1)<=page*8)){
                return (
                  <Link href={`/admin/store/detail/${st.id}`}
                    className="hover:border-[#e37547] hover:shadow-[#e376478a] hover:scale-105 hover:border-[0.5px] w-[95%] tablet:w-[45%] laptop:w-[30%] rounded-lg  desktop:w-[23%] h-[300px] shadow-xl my-[10px] flex flex-col justify-center items-center gap-[20px]"
                    key={index}
                  >
                    <div className="w-[100%] flex flex-col items-center ">
                      <div className="w-[80px] h-[80px]  border-[1px]  my-[10px]">
                        <img
                          src={`${st.picture ? st.picture : "/store.jpeg"}`}
                          className="w-full h-full"
                        ></img>
                      </div>
                      <div className="text-[#e37547] text-[20px] font-bold">
                        {st.name}
                      </div>
                    </div>
  
                    <div className="w-[100%] px-[10px] text-[#727171] text-[14px] ">
                     <div className="font-bold inline-block">{st.name}</div> is currently available in the store with the quantity of <div className="font-bold inline-block">{st.quantity}</div> selling at the price of NRP{" "}<div className="font-bold inline-block">{st.sellPrice}</div>
                    </div>
                    <div className="w-[100%] text-[white] flex justify-center items-center">
                      <div className="w-[60%] h-[50px] hover:bg-[#da4c10] bg-[#e37547] flex justify-center items-center cursor-pointer">
                        <FaChevronLeft size={20} color="white" />
                        <FaChevronLeft size={20} color="white" />
                        View More
                        <FaChevronRight size={20} color="white" />
                        <FaChevronRight size={20} color="white" />
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
          </div>
          <div className="flex w-[100%] justify-center gap-[5px] mb-[20px]">
            <div
              className="w-[40px] h-[40px] bg-[#a5a5a5] rounded-md flex justify-center items-center"
              onClick={() => {
                if (page > 1) {
                  setPage((prev) => prev - 1);
                }
              }}
            >
              <FaChevronLeft size={24} color="white" />
            </div>
            {pageNumbers.map((pg, index) => {
              if (page === 1) {
                if (Math.abs(pg - page) < 3) {
                  return (
                    <div
                      className={`w-[40px] h-[40px]  ${
                        page === pg
                          ? " border-[2px] border-[blue]"
                          : "border-[1px] border-[#d3d3d3]"
                      } rounded-md flex justify-center items-center font-bold`}
                      key={index}
                      onClick={() => {
                        setPage(pg);
                      }}
                    >
                      {pg}
                    </div>
                  );
                }
              } else if (page === Math.ceil(total / 8)) {
                if (page - pg < 3) {
                  return (
                    <div
                      className={`w-[40px] h-[40px]  ${
                        page === pg
                          ? " border-[2px] border-[blue]"
                          : "border-[1px] border-[#d3d3d3]"
                      } rounded-md flex justify-center items-center font-bold`}
                      key={index}
                      onClick={() => {
                        setPage(pg);
                      }}
                    >
                      {pg}
                    </div>
                  );
                }
              } else {
                if (pg - page >= -1 && pg - page <= 1) {
                  return (
                    <div
                      className={`w-[40px] h-[40px]  ${
                        page === pg
                          ? " border-[2px] border-[blue]"
                          : "border-[1px] border-[#d3d3d3]"
                      } rounded-md flex justify-center items-center font-bold`}
                      key={index}
                      onClick={() => {
                        setPage(pg);
                      }}
                    >
                      {pg}
                    </div>
                  );
                }
              }
            })}
            <div
              className="w-[40px] h-[40px] bg-[#a5a5a5] rounded-md flex justify-center items-center"
              onClick={() => {
                if (page < Math.ceil(total / 8)) {
                  setPage((prev) => prev + 1);
                }
              }}
            >
              <FaChevronRight size={24} color="white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
