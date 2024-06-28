"use client";
import { CircularProgress } from '@mui/joy';
import React,{useState,useEffect} from 'react'
import Select from "react-dropdown-select";
import toast from 'react-hot-toast';

const page = () => {
  const [error,setError]=useState(false)
  const [loading, setLoading] = useState(true);
  const [role,setRole]=useState()
  const [user,setUser]=useState()
  const [payment,setPayment]=useState(0);
  const[paymentMethod,setPaymentMethod]=useState('')
  const options=[{display:'Cash',value:'Cash'},{display:'Cheque',value:'Cheque'},{display:'Ebanking',value:'Ebanking'}]
  const roles=[{display:'Visitor',value:'Visitor'},
  {display:'Other',value:'Other'}]
  const [visitors,setVisitors]=useState([])
  const [purpose,setPurpose]=useState('')

  useEffect(()=>{
getVisiors()
  },[])

  const getVisiors=async()=>{
    let result=await fetch('/api/accountant/visitors',{
      method:'get'
    })
    result=await result.json()
    setLoading(false)
    if(result.success===false){
      toast.error(result.message)
    }
    else{
      const finalVisitors=result.visitors.map((visit,index)=>({
        ...visit,
        displayLabel:`${visit.firstName} ${visit.lastName}(${visit.phone})`
      }))
      setVisitors(finalVisitors)
    }
  }

  const submitCredit=async()=>{
    if(role===''||user===''||purpose===''||payment===0||paymentMethod===''){
      setError(true)
    }
    else{
      setLoading(true)
      let result=await fetch('/api/accountant/creditDetail',{
        method:'post',
        body:JSON.stringify({role:role,user:user,amount:payment,method:paymentMethod,purpose:purpose})
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
  }
  return (
    <div className="w-[100%] h-[700px] flex flex-col tablet:px-[20px] py-[20px] justify-center items-center">
    {loading ? (
      <CircularProgress />
    ) : (
      <div className="w-[100%] h-[600px] tablet:w-[80%] laptop:w-[60%]  shadow-2xl rounded-xl flex flex-col gap-[10px] mobile:px-[30px]">
        <div className="w-[100%] h-[50px] text-[20px] font-bold text-[#272727] text-center mt-[10px]">
          Add New Credit
        </div>
        <div className="w-[100%] h-[50px] text-[18px] font-bold text-[#272727] px-[30px]">
          Payment Details:
        </div>
        <div className="w-[100%] text-[#272727] tablet:px-[30px] gap-[50px] mb-[30px] flex flex-col">
          <div className="w-[100%] flex tablet:flex-row flex-col  gap-[5px]">
            <div className="w-[100%] tablet:w-[50%] flex flex-col gap-[5px]">
              <label className="flex my-[3px] font-medium ">Role:
              {error&&(role==='')?
              <div className="text-[red] font-bold text-[12px]">*Provide a user role</div>
              :''
              }</label>
              <div className="w-[90%]">
                <Select
                multi={false}
                searchable={false}
                  options={roles}
                  labelField="display"
                  valueField="value"
                  color="#7800db"
                  dropdownHeight="200px"
                  // searchBy="className"
                  onChange={(values) =>{
                    setUser('')
                    console.log(values)
                    // setStudents([]);
                    setRole(values[0].value)
                  }
                }
                />
              </div>
            </div>
            <div className="w-[100%] tablet:w-[50%] flex flex-col gap-[5px]">
              <label className="flex my-[3px] font-medium ">Name:
              {error&&(user==='')?
              <div className="text-[red] font-bold text-[12px]">*Provide a user</div>
              :''
              }
              </label>

              <div className="w-[90%]">
                {role==='Visitor'?
                 <Select
                 searchable={true}
                 multi={false}
                  options={visitors}
                  labelField="displayLabel"
                  valueField="id"
                  color="#7800db"
                  dropdownHeight="200px"
                  searchBy="className"
                  onChange={(values) =>setUser(values[0].id)}
                /> 
                
                : <input
                type="text"
                value={user}
                onChange={(e)=>setUser(e.target.value)}
                className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
              />
                
              }
              </div>
            </div>
          </div>
          <div className="w-[100%] flex tablet:flex-row flex-col   gap-[5px]">
          <div className="w-[100%] tablet:w-[50%]  flex flex-col gap-[5px]">
              <label className="flex my-[3px] font-medium ">Amount:
              {error&&payment===0?
              <div className="text-[red] font-bold text-[12px]">*Select a amount</div>
              :''
              }
              
              </label>
              <div className="w-[90%]">
              <input
              type="number"
              value={payment}
              onChange={(e)=>setPayment(e.target.value)}
              placeholder="4000"
              className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
            />
              </div>
            </div>
            <div className="w-[100%] tablet:w-[50%]  flex flex-col gap-[5px]">
              <label className="flex my-[3px] font-medium ">Payment Method:
              {error&&paymentMethod===''?
              <div className="text-[red] font-bold text-[12px]">*Select a payment method</div>
              :''
              }
              </label>
              <div className="w-[90%]">
                <Select
                  options={options}
                  labelField="display"
                  valueField="value"
                  color="#7800db"
                  dropdownHeight="200px"
                  searchBy="display"
                  onChange={(values) =>setPaymentMethod(values[0].value)}
                />
              </div>
            </div>
          </div>
          <div className="w-[100%] flex tablet:flex-row flex-col  gap-[5px]">
          <div className="w-[100%] tablet:w-[50%] flex flex-col gap-[5px]">
          <label className="flex my-[3px] font-medium ">Purpose:
              {error&&purpose===''?
              <div className="text-[red] font-bold text-[12px]">*Provide a purpose</div>
              :''
              }
              
              </label>
              <div className="w-[90%]">
              <input
              type="text"
              value={purpose}
              onChange={(e)=>setPurpose(e.target.value)}
              placeholder="Provide purpose here"
              className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
            />
              </div>
            </div>
          </div>
        </div>
          <div className="w-[100%] flex items-center justify-center mb-[30px] mt-[50px]">
        <div className="w-[150px] h-[40px] rounded-lg bg-[#a266b4] flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-[#9433ac]"
         onClick={submitCredit}
         >Submit</div>
    </div>
      </div>
    )}
  </div>
  )
}

export default page
