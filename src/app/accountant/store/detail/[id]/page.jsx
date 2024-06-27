"use client";
import { CircularProgress } from "@mui/joy";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { RiPencilFill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
const page = ({params}) => {
  const router=useRouter()
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);
  const [name,setName]=useState('')
  const[quantity,setQuantity]=useState(1)
  const[costPrice,setCostPrice]=useState()
  const[sellPrice,setSellPrice]=useState()
  const[supplierName,setSupplierName]=useState('')
  const[supplierContact,setSupplierContact]=useState('')
  const [file,setFile]=useState('')
  const [selectedImage,setSelectedImage]=useState(null)
  
  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    let result = await fetch(`/api/accountant/store/${params.id}`, {
      method: "get",
    });
    result = await result.json();
    setLoading(false);
    if (result.success === false) {
      toast.error(result.message);
    } else {
      setDetail(result.store);
      setName(result.store.name)
      setQuantity(result.store.quantity)
        setCostPrice(result.store.costPrice)
        setSellPrice(result.store.sellPrice)
        setSupplierName(result.store.supplierName)
        setSupplierContact(result.store.supplierContact)
        setSelectedImage(result.store.picture)
    }
  };

  const handleSubmit=async()=>{
    const data=new FormData()
    data.set('name',name)
    data.set('quantity',quantity)
    data.set('costPrice',costPrice)
    data.set('sellPrice',sellPrice)
    data.set('supplierName',supplierName)
    data.set('supplierContact',supplierContact)
    data.set('file',file)
    setLoading(true)
    let result=await fetch(`/api/accountant/store/${params.id}`,{
      method:'post',
      body:data
    })
    result=await result.json()
    setLoading(false)
    if(result.success===false){
      toast.error(result.message)
    }
    else{
      toast.success(result.message)
    }
  }

  const handleDelete=async()=>{
    setLoading(true)
    let result=await fetch(`/api/accountant/store/${params.id}`,{
      method:'delete',
    })
    result=await result.json()
    setLoading(false)
    if(result.success===false){
      toast.error(result.message)
    }
    else{
      router.push('/accountant/store/allProducts')
      toast.success(result.message)
    }
  }

  return (
    <div className="w-[100%] flex justify-center items-center">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="w-[100%] tablet:w-[80%] min-h-[700px] flex flex-col laptop:flex-row justify-between items-center">
          <div className="w-[100%] laptop:w-[39%] flex flex-col justify-center items-center gap-[20px] h-[200px] laptop:h-[600px] shadow-xl rounded-md bg-gradient-to-r from-[#f06273] to-[#f0936a] text-white font-bold text-[18px]">
            <div className="h-[80px] w-[80px] relative rounded-full bg-white">
              <img
                src={`${selectedImage?selectedImage:'/store.jpeg'}`}
                className="h-[100%] w-[100%] rounded-full"
              />
              <div className="absolute top-[2px] w-[25px] h-[25px] bg-white rounded-full right-[0px] flex justify-center items-center">
                <label htmlFor="image">
                <RiPencilFill size={20} color="black"  />

                </label>
                <input id="image" type="file" className="hidden" onChange={(e)=>{setFile(e.target.files[0]);
                const imageUrl=URL.createObjectURL(e.target.files[0]);
                setSelectedImage(imageUrl)
                }}></input>
              </div>
            </div>
            <span>{detail.name}</span>
            <div className="flex w-[100%] justify-center items-center gap-[10px]">
                <div className='w-[30px] h-[30px] border-[1px] border-white flex justify-center items-center' onClick={()=>{setQuantity((prev)=>prev+1)}}>
                        <MdAdd size={23}/>
                </div>
                <div className="">
                       {quantity}
                </div>
                <div className='w-[30px] h-[30px] border-[1px] border-white flex justify-center items-center' onClick={()=>{setQuantity((prev)=>prev-1)}}>
                        <RiSubtractFill size={23}/>
                </div>
              </div>
              <div className="mt-[5px] w-[160px] font-semibold h-[40px] bg-[#f0936a] cursor-pointer hover:bg-[#f06273] rounded-md flex justify-center items-center" onClick={handleDelete}>
                Delete Product
              </div>
          </div>
          <div className="w-[100%] laptop:w-[59%] flex flex-col h-[600px] shadow-xl rounded-md justify-evenly px-[10px] ">
            <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
              Profit/Loss
              <hr></hr>
            </div>
            <div className="flex flex-col tablet:flex-row  w-[100%] justify-start gap-[10px] tablet:gap-0">
            <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
                <span className="font-semibold text-[18px]">{costPrice>sellPrice?'Expected Loss':'Expected Profit'}</span>
               <span className="mt-1 text-black p-2 w-[95%] border rounded-md">${Math.abs(costPrice-sellPrice)} per quantity</span>
              </div>
            </div>
            <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
              Price Information
              <hr></hr>
            </div>
            <div className="flex flex-col tablet:flex-row  w-[100%] justify-start gap-[10px] tablet:gap-0">
              <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
                <span className="font-semibold text-[18px]">Cost Price</span>
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  className={`mt-1 text-black p-2 w-[95%] border rounded-md`}
                />
              </div>
              <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
                <span className="font-semibold text-[18px]">Selling Price</span>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className={`mt-1 text-black p-2 w-[95%] border rounded-md`}
                />
              </div>
            </div>
            <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
              Supplier Information
              <hr></hr>
            </div>
            <div className="flex flex-col tablet:flex-row  w-[100%] justify-start gap-[10px] tablet:gap-0">
              <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
                <span className="font-semibold text-[18px]">Supplier Name</span>
                <input
                  type="text"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  className={`mt-1 text-black p-2 w-[95%] border rounded-md`}
                />
              </div>
              <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
                <span className="font-semibold text-[18px]">Supplier Contact</span>
                <input
                  type="text"
                  value={supplierContact}
                  onChange={(e) => setSupplierContact(e.target.value)}
                  className={`mt-1 text-black p-2 w-[95%] border rounded-md`}
                />
              </div>
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
