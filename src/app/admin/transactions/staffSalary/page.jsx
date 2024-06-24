"use client";
import { CircularProgress } from "@mui/joy";
import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import toast from "react-hot-toast";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [users, setUsers] = useState([]);
  const options=[{display:'Cash',value:'Cash'},{display:'Cheque',value:'Cheque'},{display:'Ebanking',value:'Ebanking'}]
  const [payment,setPayment]=useState(0);
  const[paymentMethod,setPaymentMethod]=useState('')
  const [obtainedUsers,setObtainedUsers]=useState([])
  const roles = [
    {
      name: "Accounting",
      value: "Accounting",
    },
    {
      name: "FrontDesk",
      value: "FrontDesk",
    },
    {
      name: "Teacher",
      value: "Teacher",
    },
  ];
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let result = await fetch("/api/accountant/employees", {
      method: "get",
    });
    result = await result.json();
    setLoading(false);
    if (result.success === true) {
      setObtainedUsers(result.users)
      setUsers(result.users);
    }
  };

  const salaryPayment=async()=>{
    console.log("selected Employee is",selectedEmployee)
    if(!selectedEmployee||payment===0||paymentMethod===''){
      setError(true)
      console.log("still error")
    }
    else{
      console.log("running else")
      let employeeId;
      if(selectedEmployee.teacher!==null){
        employeeId=selectedEmployee.teacher.id
      }
      else if(selectedEmployee.frontDesk!==null){
        employeeId=selectedEmployee.frontDesk.id
      }
      else if(selectedEmployee.accountant!==null){
        employeeId=selectedEmployee.accountant.id
      }
      else{
        toast.error("Something went wrong!! Try again!");
        return 
      }
      setLoading(true)
      let result = await fetch("/api/accountant/salaryPayment", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({role:selectedEmployee.role,employeeId:employeeId,amount:payment,method:paymentMethod})
      });
      result=await result.json()
    setLoading(false);
      if(result.success===false){
        toast.error(result.message)
      }
      else {
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
            Add Salary Payment
          </div>
          <div className="w-[100%] h-[50px] text-[18px] font-bold text-[#272727] px-[30px]">
            Payment Details:
          </div>
          <div className="w-[100%] text-[#272727] tablet:px-[30px] gap-[50px] mb-[30px] flex flex-col">
            <div className="w-[100%] flex tablet:flex-row flex-col  gap-[5px]">
              <div className="w-[100%] tablet:w-[50%]  flex flex-col gap-[5px]">
                <label className="flex my-[3px] font-medium ">Role:</label>
                <div className="w-[90%]">
                  <Select
                    options={roles}
                    labelField="name"
                    valueField="value"
                    color="#7800db"
                    dropdownHeight="200px"
                    searchBy="className"
                    onChange={(values) => {
                      const usersArray=[]
                      obtainedUsers.forEach((user,index) => {
                        console.log(user)
                        if(user.role===values[0].value){
                          usersArray.push(user)
                        }
                      });
                      setUsers(usersArray);
                    }}
                  />
                </div>
              </div>
              <div className="w-[100%] tablet:w-[50%]  flex flex-col gap-[5px]">
                <label className="flex my-[3px] font-medium ">
                  Employee:
                  {error&&!selectedEmployee?
              <div className="text-[red] font-bold text-[12px]">*Select an employee</div>
              :''
              }
                </label>

                <div className="w-[90%]">
                  <Select
                    options={users}
                    labelField="name"
                    valueField="id"
                    color="#7800db"
                    dropdownHeight="200px"
                    searchBy="className"
                    onChange={(values) => setSelectedEmployee(values[0])}
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%] flex tablet:flex-row flex-col  gap-[5px]">
              <div className="w-[100%] tablet:w-[50%]  flex flex-col gap-[5px]">
                <label className="flex my-[3px] font-medium ">
                  Amount:
                  {error&&payment===0?
              <div className="text-[red] font-bold text-[12px]">*Select a amount</div>
              :''
              }
                </label>
                <div className="w-[90%]">
                  <input
                    type="number"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    placeholder="4000"
                    className="w-[100%] h-[45px] bg-[white] outline-none px-[10px] rounded-md border-[#d3d3d3] border-[2px]"
                  />
                </div>
              </div>
              <div className="w-[100%] tablet:w-[50%]  flex flex-col gap-[5px]">
                <label className="flex my-[3px] font-medium ">
                  Payment Method:
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
                    onChange={(values) => setPaymentMethod(values[0].value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] flex items-center justify-center mb-[30px] mt-[50px]">
            <div
              className="w-[150px] h-[40px] rounded-lg bg-[#a266b4] flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-[#9433ac]"
              onClick={salaryPayment}
            >
              Submit
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
