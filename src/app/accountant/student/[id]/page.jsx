"use client"
import { CircularProgress } from "@mui/joy";
import Multiselect from "multiselect-react-dropdown";
import Link from "next/link";
import React,{useState,useEffect} from "react";
import toast from "react-hot-toast";

const page = ({ params }) => {
    const [loading,setLoading]=useState(true)
    const [streetAddress, setStreetAddress] = useState("");
    const[firstName,setFirstName] = useState('')
    const[lastName,setLastName] = useState('')
    const[phone,setPhone]=useState('')
    const[email,setEmail]=useState('')
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [fee,setFee]=useState()
    const [selectedClasses,setSelectedClasses]=useState([])
    const[detail,setDetail]=useState({})
    const [paid,setPaid]=useState()
    const[classes,setClasses]=useState([])
    const [active,setActive]=useState()

    useEffect(()=>{
      getClasses()
        getDetail()
    },[])



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
            setDetail(result.student)
            setFirstName(result.student.firstName)
            setLastName(result.student.lastName)
            setStreetAddress(result.student.streetAddress)
            setEmail(result.student.email)
            setPhone(result.student.phone)
            setCity(result.student.city)
            setState(result.student.state)
            setFee(parseFloat(result.student.agreedFee))
          setActive(result.student.active)

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
      <div className="w-[100%] laptop:w-[39%] flex flex-col justify-center items-center gap-[10px] h-[300px] laptop:h-[800px] shadow-xl rounded-md bg-gradient-to-r from-[#f06273] to-[#f0936a] text-white font-bold text-[18px]">
        <div className="h-[80px] w-[80px] rounded-full bg-white">
          <img src={`${detail.gender==='Male'?'/profile-demo.jpg':'/female.png'}`} className="h-[100%] w-[100%] rounded-full" />
        </div>
        <div className="flex justify-center items-center">
        <input
                    type="text"
                   
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`mt-1 w-[100px] p-2 bg-transparent max-w-fit border-none rounded-md focus:border-[#f0936a] focus:border-[1px]`}
                  />
        <input
                    type="text"
                   
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`mt-1 w-[100px] bg-transparent p-2 max-w-fit border-none rounded-md focus:border-[#f0936a] focus:border-[1px]`}
                  />
        {/* <span>{detail.firstName} {detail.lastName}</span> */}
          </div>
        <span>Student</span>
        <span>Joined On:{(new Date(detail.createdAt)).toLocaleString(undefined,{
    year: 'numeric',   // Full numeric representation of the year (e.g., 2024)
    month: 'long',     // Full month name (e.g., January)
    day: 'numeric',    // Numeric day of the month (e.g., 1, 2, 31)
    // weekday: 'long'    // Full weekday name (e.g., Monday)
  })}</span>
  {active?
  <div className="w-[180px] h-[60px] bg-[green] flex justify-center items-center rounded-md cursor-pointer" onClick={()=>setActive(false)}>Mark as Unactive</div>
  :<div className="w-[180px] h-[60px] bg-[red] flex justify-center items-center rounded-md cursor-pointer" onClick={()=>setActive(true)}>Mark as Active</div>
  }
      </div>
      <div className="w-[100%] laptop:w-[59%] flex flex-col h-[800px] shadow-xl rounded-md justify-evenly px-[10px] ">
        <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
          Information
          <hr></hr>
        </div>
        <div className="flex flex-col tablet:flex-row w-[100%] justify-start gap-[10px] tablet:gap-0">
          <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
            <span className="font-semibold text-[18px]">Email</span>
            <input
                    type="text"
                   
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-1 text-black p-2 w-[95%] border rounded-md`}
                  />
          </div>
          <div className="flex flex-col w-[50%] tablet:h-[80px] justify-between">
            <span className="font-semibold text-[18px]">Phone</span>
            <input
                    type="text"
                  
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`mt-1 text-black p-2 w-[95%] border rounded-md`}
                  />
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
        <div className="flex w-[100%] justify-start gap-[5px]">
        {detail.classes.map((classs,index)=>{
            return(
              <Link href={`/admin/class/history/class/${classs.class.id}`} className="w-[120px] my-[15px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer" key={index}>
                {classs.class.className}
              </Link>
            )
          })}
        </div>
        <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
          Add Classes
          <hr></hr>
        </div>
        <div className="flex w-[100%] flex-wrap justify-start gap-[5px]">
        <Multiselect  className='' placeholder=""  displayValue='displayLabel' options={classes} selectedValues={classes.filter(cls => selectedClasses.includes(cls.id))} onRemove={handleRemove}  onSelect={handleSelect}/>
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
        <Link href={`/admin/student/feePayment/${detail.id}`} className="w-[150px] my-[15px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer">View FeePayment</Link>
        </div>
        <div className="w-[100%] text-[18px] font-semibold text-[#3f3f3f]">
          Attendance
          <hr></hr>
        </div>
        <div className="flex w-[100%] justify-start">
        <Link href={`/admin/student/attendance/${detail.id}`} className="w-[150px] my-[15px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer">View Attendance</Link>
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
}

export default page;
