"use client"
import { CircularProgress } from "@mui/joy";
import Multiselect from "multiselect-react-dropdown";
import Link from "next/link";
import React,{useState,useEffect} from "react";
import toast from "react-hot-toast";

const page = ({ params }) => {
    const [loading,setLoading]=useState(true)
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [fee,setFee]=useState()
    const [selectedClasses,setSelectedClasses]=useState([])
    const[detail,setDetail]=useState({})
    const [paid,setPaid]=useState()
    const[classes,setClasses]=useState([])
    useEffect(()=>{
      getClasses()
        getDetail()
    },[])

    // useEffect(()=>{
    // const finalClasses=allClasses.map((clss,index)=>{
    //     if(selectedClasses.includes(clss.id)===false){
    //       return clss
    //     }
    //   })
    //   setClasses(finalClasses)
    // },[allClasses])

    const getClasses=async()=>{
      let result = await fetch(`/api/accountant/classes`, {
        method: "get",
      });
      result = await result.json();
      if (result.success === false) {
        toast.error(result.message)
      } 
      else{
        const processedClasses = result.classes.map(cls => ({
          
          ...cls,
          displayLabel: `${cls.className} (${cls.startTime} - ${cls.endTime})`
        }));
        setClasses(processedClasses)
      }
    }

    const getDetail=async()=>{
        let result=await fetch(`/api/accountant/studentDetails/${params.id}`,{
            method:'get'
        })
        result=await result.json()
        if(result.success===false){
            toast.error(result.message)
        }
        else{
          console.log(result.student)
            setDetail(result.student)
            setStreetAddress(result.student.streetAddress)
            setCity(result.student.city)
            setState(result.student.state)
            setFee(parseInt(result.student.agreedFee))
            let classIds=[]
            result.student.classes.forEach((clss,index)=>{
              classIds.push(clss.class.id)
            })
            setSelectedClasses(classIds)
            let totalPaid=0;
            result.student.payments.forEach((pay,index)=>{
              totalPaid=totalPaid+parseFloat(pay.amount)
            })
            setPaid(totalPaid)
        }
        setLoading(false)

    }

    const handleSelect = (selectedList) => {
      setSelectedClasses(selectedList.map(item => item.id));
    };
  
    const handleRemove = (selectedList) => {
      setSelectedClasses(selectedList.map(item => item.id));
    };
    console.log("selected classes are",selectedClasses)

    const handleSubmit=async()=>{
      setLoading(true)
      let result=await fetch(`/api/accountant/studentDetails/${params.id}`,{
        method:'post',
        body:JSON.stringify({streetAddress,city,state,fee,selectedClasses})
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
    
  return (
    <div className="w-[100%] flex justify-center items-center">
    {loading?<CircularProgress/>:
    
  <div className="w-[100%] tablet:w-[80%] flex flex-col laptop:flex-row justify-between items-center">
    <div className="w-[100%] laptop:w-[39%] flex flex-col justify-center items-center gap-[20px] h-[200px] laptop:h-[800px] shadow-xl rounded-md bg-gradient-to-r from-[#f06273] to-[#f0936a] text-white font-bold text-[18px]">
      <div className="h-[80px] w-[80px] rounded-full bg-white">
        <img src={`${detail.gender==='Male'?'/profile-demo.jpg':'/female.png'}`} className="h-[100%] w-[100%] rounded-full" />
      </div>
      <span>{detail.firstName} {detail.lastName}</span>
      <span>Student</span>
    </div>
    <div className="w-[100%] laptop:w-[59%] flex flex-col h-[800px] shadow-xl rounded-md justify-evenly px-[10px] ">
      <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
        Information
        <hr></hr>
      </div>
      <div className="flex flex-col tablet:flex-row w-[100%] justify-start gap-[10px] tablet:gap-0">
        <div className="flex flex-col w-[50%] tablet:h-[60px] justify-between">
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
        Classes
        <hr></hr>
      </div>
      <div className="flex flex-col tablet:flex-row  w-[100%] justify-start gap-[10px] tablet:gap-0">
      {/* <div className="flex w-[50%] flex-wrap justify-start gap-[5px]">
      {detail.classes.map((classs,index)=>{
          return(
            <div className="w-[120px] my-[15px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer" key={index}>
              {classs.class.className}
            </div>
          )
        })}
      </div> */}
      <div className="flex w-[100%] flex-wrap justify-start gap-[5px]">
      <Multiselect  className='' placeholder=""  displayValue='displayLabel' options={classes} selectedValues={classes.filter(cls => selectedClasses.includes(cls.id))} onRemove={handleRemove}  onSelect={handleSelect}/>
      </div>

      </div>
      <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
        Transactions
        <hr></hr>
      </div>
      <div className="flex flex-col tablet:flex-row  w-[100%] justify-start gap-[10px] tablet:gap-0">
              <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
                <span className="font-semibold text-[18px]">AgreedFee</span>
                <input
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className={`mt-1 text-black p-2 w-[95%] border rounded-md`}
                />
              </div>
              <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
                <span className="font-semibold text-[18px]">Paid Fee</span>
               <span className="text-[16px]">Rs {paid}</span>
              </div>

            </div>
      <div className="flex w-[100%] justify-start">
      <Link href={`/accountant/student/feePayment/${detail.id}`} className="w-[150px] my-[15px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer">View FeePayment</Link>
      </div>
      <div className="w-[100%] flex justify-center  text-[18px] font-semibold ">
              <div className="text-white bg-[#a25dda] flex justify-center items-center w-[120px] h-[40px] rounded-md cursor-pointer hover:bg-[#a540a5]" onClick={handleSubmit}>
                <span>Submit</span>
              </div>
            </div>
    </div>
  </div>
    }
</div>
  );
};

export default page;
