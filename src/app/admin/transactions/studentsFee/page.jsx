"use client";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/joy";
import Select from "react-dropdown-select";
import toast from "react-hot-toast";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [error,setError]=useState(false)
  const [payment,setPayment]=useState(0);
  const[paymentMethod,setPaymentMethod]=useState('')
  const options=[{display:'Cash',value:'Cash'},{display:'Cheque',value:'Cheque'},{display:'Ebanking',value:'Ebanking'}]
  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    let result = await fetch(`/api/accountant/students`, {
      method: "get",
    });
    result = await result.json();
    setLoading(false);
    if (result.success === false) {
      toast.error(result.message);
    } else {
      const processedClasses = result.classesWithStudents.map((cls) => ({
        ...cls,
        displayLabel: `${cls.className} (${cls.startTime} - ${cls.endTime})`,
      }));
      setClasses(processedClasses);
    }
  };

  const submitFeePayment=async()=>{
    if(Object.keys(selectedStudent).length === 0||paymentMethod===''||payment===0){
      setError(true)
    }
    else{
      console.log("student selected is",selectedStudent)
      setLoading(true)
      let result=await fetch('/api/accountant/payment',{
        method:'post',
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({studentID:selectedStudent.id,amount:payment,method:paymentMethod})
      });
      result=await result.json();
      setLoading(false)
      if(result.success===false){
        toast.error(result.message)
      }else{
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
            Add Student Fee Payment
          </div>
          <div className="w-[100%] h-[50px] text-[18px] font-bold text-[#272727] px-[30px]">
            Payment Details:
          </div>
          <div className="w-[100%] text-[#272727] tablet:px-[30px] gap-[50px] mb-[30px] flex flex-col">
            <div className="w-[100%] flex tablet:flex-row flex-col  gap-[5px]">
              <div className="w-[100%] tablet:w-[50%]  flex flex-col gap-[5px]">
                <label className="flex my-[3px] font-medium ">Class:</label>
                <div className="w-[90%]">
                  <Select
                    options={classes}
                    labelField="displayLabel"
                    valueField="id"
                    color="#7800db"
                    dropdownHeight="200px"
                    searchBy="className"
                    onChange={(values) =>{
                      // setStudents([]);
                      const newStudents = [];
                      (values[0].students).forEach(element => {
                       element.student.displayName=`${element.student.firstName} ${element.student.lastName}`
                       newStudents.push(element.student)
                     });
                     setStudents(newStudents)
                    }
                  }
                  />
                </div>
              </div>
              <div className="w-[100%] tablet:w-[50%]  flex flex-col gap-[5px]">
                <label className="flex my-[3px] font-medium ">Student:
                {error&&Object.keys(selectedStudent).length === 0?
                <div className="text-[red] font-bold text-[12px]">*Select a student</div>
                :''
                }
                </label>

                <div className="w-[90%]">
                  <Select
                    options={students}
                    labelField="displayName"
                    valueField="id"
                    color="#7800db"
                    dropdownHeight="200px"
                    searchBy="className"
                    onChange={(values) =>setSelectedStudent(values[0])}
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%] flex tablet:flex-row flex-col  gap-[5px]">
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
              <div className="w-[100%] tablet:w-[50%] flex flex-col gap-[5px]">
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
          </div>
            <div className="w-[100%] flex items-center justify-center mb-[30px] mt-[50px]">
          <div className="w-[150px] h-[40px] rounded-lg bg-[#a266b4] flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-[#9433ac]" onClick={submitFeePayment}>Submit</div>
      </div>
        </div>
      )}
    </div>
  );
};

export default page;
