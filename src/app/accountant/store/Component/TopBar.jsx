"use client"
import React,{useState,useEffect} from 'react'
import { IoMdAdd } from "react-icons/io";
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { useDispatch} from "react-redux";
import { setLoadingFalse, setLoadingTrue } from '@/store/loadingShow/loadingShow';
import toast from 'react-hot-toast';
import { RiPencilFill } from 'react-icons/ri';
import { MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import Modal from '@/app/admin/components/Modal';
const TopBar = () => {
  const pathName = usePathname()
  const dispatch=useDispatch()
  const [showModal,setShowModal]=useState(false)
  const [error,setError]=useState(false)
  const [name,setName]=useState('')
  const[quantity,setQuantity]=useState(1)
  const[costPrice,setCostPrice]=useState()
  const[sellPrice,setSellPrice]=useState()
  const[supplierName,setSupplierName]=useState('')
  const[supplierContact,setSupplierContact]=useState('')
  const [file,setFile]=useState('')
  const [selectedImage,setSelectedImage]=useState(null)

  const handleToogle=()=>{
    setShowModal(true)
  }

  const closeModal = () => setShowModal(false);

  const submitProduct=async()=>{
    if(name===''||quantity<=0||!costPrice||supplierName===''||supplierContact===''){
        setError(true)
    }
    else{
      const data=new FormData()
      data.set('name',name)
      data.set('quantity',quantity)
      data.set('costPrice',costPrice)
      data.set('sellPrice',sellPrice)
      data.set('supplierName',supplierName)
      data.set('supplierContact',supplierContact)
      data.set('file',file)
      dispatch(setLoadingTrue())
      let result=await fetch('/api/accountant/store',{
        method:'post',
        body:data
      })
      result=await result.json()
      dispatch(setLoadingFalse())
      if(result.success===false){
        toast.error(result.message)
      }
      else{
        toast.success(result.message)
      }
    }
  }


  return (
    <div className='w-[100%] h-[70px] flex bg-[#e6e6e6] justify-between px-[50px] items-center'>
      <div className='text-[black] font-serif relative font-bold'>
        <Link href='/accountant/store/allProducts'> All Products</Link>
        {pathName==='/accountant/store/allProducts'?
        <div className='w-[80px] h-[5px] rounded-lg bg-[#a16db1] absolute top-[43px]'></div>
        :''
        }
       </div>
      <div className='w-[170px] h-[50px] bg-[#5151cc] text-[16px] items-center justify-evenly flex text-white rounded-lg cursor-pointer' onClick={handleToogle}>
        <IoMdAdd size={25}/>
        Add New Product</div>

        <Modal isOpen={showModal} onClose={closeModal}>
          <div className=''>
          <h1 className="text-[16px] text-black font-semibold px-[15px] pt-[5px] my-[10px]">
            Add New Product
          </h1>
          <div className="bg-[#f0f0f0] text-[black] p-[15px] text-[15px] font-sans flex flex-col gap-[5px]">
            <div className='w-[100%] flex justify-center items-center'>
                <div className='relative w-[150px] h-[150px] '>
                    <img src={`${selectedImage?selectedImage:'/store.jpeg'}`} className='h-full w-full'>
                    </img>
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
                </div>
          <label className="flex my-[3px] font-medium ">Product Name
            {error&&(name==='')?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide product name</div>
          :''  
          }
            </label>
            <div className="flex w-[100%] flex-col gap-[5px]">
                <input
                  type="text"
                  placeholder='ex: Notebook'
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
                />
              </div>
              <label className="flex my-[3px] font-medium ">Quantity
            {error&&(quantity<=0)?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide quantity</div>
          :''  
          }
            </label>
            <div className="flex w-[100%]  items-center gap-[10px]">
                <div className='w-[30px] h-[30px] border-[1px] border-black flex justify-center items-center' onClick={()=>{setQuantity((prev)=>prev+1)}}>
                        <MdAdd size={23}/>
                </div>
                <div className="">
                       {quantity}
                </div>
                <div className='w-[30px] h-[30px] border-[1px] border-black flex justify-center items-center' onClick={()=>{setQuantity((prev)=>prev-1)}}>
                        <RiSubtractFill size={23}/>
                </div>
              </div>
              <label className="flex my-[3px] font-medium ">Cost Price
            {error&&(!costPrice)?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide cost price</div>
          :''  
          }
            </label>
            <div className="flex w-[100%] flex-col gap-[5px]">
                <input
                  type="number"
                  placeholder='eg:200'
                  value={costPrice}
                  onChange={(e)=>setCostPrice(e.target.value)}
                  className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
                />
              </div>
              <label className="flex my-[3px] font-medium ">Selling Price
            {/* {error&&(sellPrice==='')?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide selling price</div>
          :''  
          } */}
            </label>
            <div className="flex w-[100%] flex-col gap-[5px]">
                <input
                  type="number"
                  placeholder='eg: 250'
                  value={sellPrice}
                  onChange={(e)=>setSellPrice(e.target.value)}
                  className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
                />
              </div>
              <label className="flex my-[3px] font-medium ">Supplier Name
            {error&&(supplierName==='')?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide supplier name</div>
          :''  
          }
            </label>
            <div className="flex w-[100%] flex-col gap-[5px]">
                <input
                  type="text"
                  value={supplierName}
                  onChange={(e)=>setSupplierName(e.target.value)}
                  className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
                />
              </div>
              <label className="flex my-[3px] font-medium ">Supplier Phone
            {error&&(supplierContact==='')?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide supplier phone</div>
          :''  
          }
            </label>
            <div className="flex w-[100%] flex-col gap-[5px]">
                <input
                  type="text"
                  value={supplierContact}
                  onChange={(e)=>setSupplierContact(e.target.value)}
                  className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
                />
              </div>
          </div>
          <div className="bg-white px-[10px]">
              <div className="w-[150px] my-[15px] mt-[20px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer" onClick={submitProduct}>Confirm product</div>
            </div>
          </div>
        </Modal>
    </div>
  )
}

export default TopBar
