"use client"
import { setLoadingFalse, setLoadingTrue } from "@/store/loadingShow/loadingShow";
import { useDispatch } from "react-redux";
import React,{useState,useEffect} from 'react'
import Multiselect from 'multiselect-react-dropdown';
import { CircularProgress } from '@mui/joy';
import toast from "react-hot-toast";
const page = () => {
  const dispatch=useDispatch()
  const[loading,setLoading]=useState(true)
  const [gender, setGender] = useState('Male');
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [streetAddress,setStreetAddress]=useState('')
  const [city,setCity]=useState('')
  const [state,setState]=useState('')
  const [zipCode,setZipCode]=useState('')
  const [phone,setPhone]=useState('')
  const [email,setEmail]=useState('')
  const[classes,setClasses]=useState([])
  const[selectedClasses,setSelectedClasses]=useState([])
  const[fee,setFee]=useState()
  const [error,setError]=useState(false)
  const rgexp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

    useEffect(()=>{
      getClasses()
    },[])

    const getClasses=async()=>{
      let result = await fetch(`/api/accountant/classes`, {
        method: "get",
      });
      result = await result.json();
      setLoading(false)
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

  const addStudent=async()=>{
    console.log("classes are",selectedClasses)

    if(gender===''||firstName===''||lastName===''||streetAddress===''||city===''||state===''||zipCode===''||phone===''||!rgexp.test(email)||!fee){
      setError(true)
    }
    else{
        dispatch(setLoadingTrue())
      let result = await fetch(`/api/accountant/admission`, {
        method: "post",
        body: JSON.stringify({firstName,lastName,streetAddress,city,state,zipCode,email,phone,gender,selectedClasses,fee}),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      dispatch(setLoadingFalse())
      if (result.success === false) {
        toast.error(result.message)
      } 
      else{
        toast.success(result.message)
      }
    }
  }

  const handleSelect = (selectedList) => {
    setSelectedClasses(selectedList.map(item => item.id));
  };

  const handleRemove = (selectedList) => {
    setSelectedClasses(selectedList.map(item => item.id));
  };
  return (
    <div className=" w-[100%] flex flex-col tablet:px-[20px] py-[20px] items-center">
      {loading?<CircularProgress className="absolute top-[49%] left-[49%]"/>:
      
      
    <div className="w-[100%] tablet:w-[80%] laptop:w-[45%]  shadow-2xl rounded-xl flex flex-col gap-[10px] mobile:px-[30px]">
      <div className="w-[100%] h-[50px] text-[20px] font-bold text-[#272727] text-center mt-[10px]">
        Add New Student
      </div>
      <div className="w-[100%] h-[50px] text-[18px] font-bold text-[#272727] px-[30px]">
        Students Details:
      </div>
      <div className="w-[100%] text-[#272727] tablet:px-[30px] gap-[20px] mb-[30px] flex flex-col">
        <div className="w-[100%] flex flex-col gap-[5px]">
          <label className="flex my-[3px] font-medium ">Full Name
          {error&&(firstName===''||lastName==='')?
          <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide full name</div>
        :''  
        }
          </label>
          <div className="flex flex-col tablet:flex-row justify-between w-[100%] gap-[20px]">
            <div className="flex w-[100%] tablet:w-[46%] flex-col gap-[5px]">
              <input
                type="text"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
              />
              <span className="text-[#535353]">First Name</span>
            </div>
            <div className="flex w-[100%] tablet:w-[46%] flex-col">
              <input
                type="text"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                className="w-[100%] h-[45px]  bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
              />
              <span className="text-[#535353]">Last Name</span>
            </div>
          </div>
        </div>
        <div className="w-[100%] flex flex-col gap-[5px]">
          <label className="flex my-[3px] font-medium">Address
          {error&&(streetAddress===''||city===''||zipCode===''||state==='')?
          <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide full address</div>
        :''  
        }
          </label>
          <div className="flex w-[100%] flex-col gap-[5px]">
            <input
              value={streetAddress}
              onChange={(e)=>setStreetAddress(e.target.value)}
              type="text"
              className="w-[100%] h-[45px]  bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
            />
            <span className="text-[#535353]">Street Address</span>
          </div>

          <div className="flex flex-col tablet:flex-row justify-between w-[100%] mt-[5px]">
            <div className="flex w-[100%] tablet:w-[46%] flex-col gap-[5px]">
              <input
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                type="text"
                className="w-[100%] h-[45px]  bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
              />
              <span className="text-[#535353]">City</span>
            </div>
            <div className="flex w-[100%] tablet:w-[46%] flex-col gap-[5px]">
              <input
                value={state}
                onChange={(e)=>setState(e.target.value)}
                type="text"
                className="w-[100%] h-[45px]  bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
              />
              <span className="text-[#535353]">State / Province</span>
            </div>
          </div>
          <div className="flex w-[100%] flex-col gap-[5px] mt-[5px]">
            <input
              value={zipCode}
              onChange={(e)=>setZipCode(e.target.value)}
              type="text"
              className="w-[100%] h-[45px]  bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
            />
            <span className="text-[#535353]">Postal / Zip Code</span>
          </div>
        </div>

        <div className="flex flex-col tablet:flex-row justify-between w-[100%] gap-[20px]">
          <div className="flex w-[100%] tablet:w-[46%] flex-col gap-[5px]">
            <label className="flex my-[3px] font-medium">Phone
            {error&&phone===''?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide phone number</div>
            :''
          }
            </label>
            <input
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              type="text"
              placeholder="+977 (0000000000) "
              className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
            />
          </div>
          <div className="flex w-[100%] tablet:w-[46%] flex-col">
            <label className="flex my-[3px] font-medium">Email
            {error&&!rgexp.test(email)?
            <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide valid email</div>
            :''
          }
            
            </label>
            <input
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="ex: email@example.com"
              className="w-[100%] h-[45px]  bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
            />
            <span className="text-[#535353]">example@email.com</span>
          </div>
        </div>

        <div className="flex flex-col tablet:flex-row justify-between w-[100%] gap-[20px]">
        <div className="flex w-[100%] tablet:w-[46%] flex-col gap-[5px]">
              <label className="flex my-[3px] font-medium">Total Fee
              {error&&fee===''?
              <div className="text-[red] font-bold text-[10px] ml-[5px] mt-[3px]">*Please provide total fee</div>
              :''
            }
              
              </label>
              <input
                value={fee}
                onChange={(e)=>setFee(e.target.value)}
                type="number"
                placeholder="ex: 12,000"
                className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
              />
            </div>
          <div className="flex w-[100%] tablet:w-[46%] flex-col justify-evenly">
            <label className="block my-[3px] font-medium">Gender</label>
            <div className="flex gap-[3px]">
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
          </div>
        </div>


        <div className="flex flex-col tablet:flex-row justify-between w-[100%] gap-[20px]">
          <div className="flex w-[100%]  flex-col justify-evenly">
            <label className="block my-[3px] font-medium">Classes</label>
            <div className="flex gap-[3px] w-[100%] ">
             <Multiselect  className='w-full'  displayValue='displayLabel' options={classes} selectedValues={classes.filter(cls => selectedClasses.includes(cls.id))} onRemove={handleRemove}  onSelect={handleSelect}/>
            </div>
          </div>
        </div>

      </div>

      <div className="w-[100%] flex items-center justify-center mb-[30px]">
          <div className="w-[150px] h-[40px] rounded-lg bg-[#a266b4] flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-[#9433ac]" onClick={addStudent}>Submit</div>
      </div>
    </div>
      }

  </div>
  )
}

export default page
