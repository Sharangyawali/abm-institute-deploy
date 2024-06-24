"use client";
import React, { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import { format } from "date-fns";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SimpleLineChart from "../components/SimpleLineChart";
import PieChartWithPaddingAngle from "../components/PieChartWithPaddingAngle";
import BarChartGraph from "../components/BarChartGraph";
import { CircularProgress } from "@mui/joy";
import { useSelector,useDispatch } from 'react-redux';
import { fetchAccountantData, fetchFrontDeskData, fetchStudentData, fetchTeacherData } from '@/store/employeesDetails/employeesDetailsThunk';

const page = () => {
  const dispatch=useDispatch()
  const teachers=useSelector((state)=>state.employeeDetails.teachers)
  const students=useSelector((state)=>state.employeeDetails.students)
  const frontDesk=useSelector((state)=>state.employeeDetails.frontDesks)
  const accountant=useSelector((state)=>state.employeeDetails.accountants)
  const [monthlyTransactions, setMonthlyTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [openRows, setOpenRows] = useState([]);

  // const [teachers, setTeachers] = useState([]);
  // const [students, setStudents] = useState([]);
  const [loading,setLoading]=useState(true)
  // const [accountant,setAccountant]=useState([])
  // const [frontDesk,setFrontDesk]=useState([])
  const[debited,setDebited]=useState([])
  const [credited,setCredited]=useState([])
  const[male,setMale]=useState(0)
  const[female,setFemale]=useState(0)
  const[others,setOthers]=useState(0)
  const [total,setTotal]=useState(0)
  useEffect(() => {

    getMonthlyTransactions();
    if(teachers.length===0){
      dispatch(fetchTeacherData())
    }
    if(students.length===0){
      dispatch(fetchStudentData())
    }
    if(accountant.length===0){
      dispatch(fetchAccountantData())
    }  
    if(frontDesk.length===0){
      dispatch(fetchFrontDeskData())
    }  
    getPayments()
 
  
    getLatestTransaction()
  }, [dispatch]);  

  useEffect(() => {
    calculateGenders(students, teachers, accountant, frontDesk);
  }, [students, teachers, accountant, frontDesk]);

  const calculateGenders = (students, teachers, accountant, frontDesk) => {
    let maleCount = 0;
    let femaleCount = 0;
    let othersCount = 0;
    let totalCount = 0;

    const countGenders = (people) => {
      people.forEach((person) => {
        if (person.gender === "Male") {
          maleCount++;
        } else if (person.gender === "Female") {
          femaleCount++;
        } else if (person.gender === "Other") {
          othersCount++;
        }
        totalCount++;
      });
    };

    countGenders(students);
    countGenders(teachers);
    countGenders(accountant);
    countGenders(frontDesk);

    setMale(maleCount);
    setFemale(femaleCount);
    setOthers(othersCount);
    setTotal(totalCount);
  };

  const getMonthlyTransactions = async () => {
    let result = await fetch("/api/accountant/monthlyTransaction", {
      method: "get",
    });  
    result = await result.json();
    if (result.success === true) {
      console.log("monthly transactions are", result.transactions);
      setMonthlyTransactions(result.transactions);
    }  
  };  

  const toggleRow = (index) => {
    setOpenRows((prevOpenRows) =>
      prevOpenRows.includes(index)
        ? prevOpenRows.filter((i) => i !== index)
        : [...prevOpenRows, index]
    );
  };



  const PieChartData = [
    { name: "Male", value: (male *100/total) },
    { name: "Female", value: (female*100/total) },
    { name: "Others", value: (others*100/total) },
  ];

  const barData = [
    {
      name: "Mathematics",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Physics",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "English",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Biology",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Chemistry",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];
  const getPayments = async () => {
    let result = await fetch("/api/accountant/payment", {
      method: "get",
    });
    result = await result.json();
    if (result.success === true) {
      console.log("transactions are", result.transactions);
      setTransactions(result.transactions);
      getMonthlyTransactions();
    }
  };

  const getLatestTransaction=async()=>{
    let result=await fetch("/api/accountant/latestTransactions",{
      method:"get"
    })
    result=await result.json();
    setLoading(false);
    if(result.success===true){
      setCredited(result.creditedTransactions)
      setDebited(result.debitedTransactions)
    }
  }

  return (
    <div className="w-[100%] bg-[white] laptop:px-7 flex flex-col justify-around items-center">
      {loading?<CircularProgress></CircularProgress>:
      (
        <>
      <div className=" w-[100%] flex flex-col laptop:flex-row justify-between items-center gap-4">
        <div className=" w-[90%] tablet:w-[70%] laptop:w-[25%] h-[160px] bg-gradient-to-r from-orange-400 to-orange-100 rounded-3xl shadow-xl shadow-orange-200 flex justify-between px-4 tablet:px-12 items-center">
          <div className="text-[white] pt-2  flex-col h-[80px] tablet:h-[110px] justify-between">
            <p className="text-3xl font-bold">{(accountant.length)+(frontDesk.length)}</p>
            <p className="text-sm pt-[40px] font-semibold">Staffs</p>
          </div>
          <div className="w-[90px] h-[90px] tablet:w-[110px] bg-white tablet:h-[110px]  rounded-full flex items-center justify-center">
            <FaUsers className="text-orange-400" size={60} />
          </div>
        </div>
        <div className="w-[90%] tablet:w-[70%] laptop:w-[25%] h-[160px] bg-gradient-to-r from-[#a200ff] to-[#e2c5f7] rounded-3xl shadow-xl shadow-[#f8b7f8] flex justify-between px-4 tablet:px-12 items-center">
          <div className="text-[white] pt-2  flex-col h-[110px] justify-between">
            <p className="text-3xl font-bold">{students.length}</p>
            <p className="text-sm pt-[40px] font-semibold">Students</p>
          </div>
          <div className="w-[90px] h-[90px] tablet:w-[110px] bg-white tablet:h-[110px] rounded-full flex items-center justify-center">
            <FaGraduationCap className="text-[#a44eaf]" size={60} />
          </div>
        </div>
        <div className="w-[90%] tablet:w-[70%] laptop:w-[25%] h-[160px] bg-gradient-to-r from-[#00eeff] to-[#c3ebf7] rounded-3xl shadow-xl shadow-[#9decf1] flex justify-between px-4 tablet:px-12 items-center">
          <div className="text-[white] pt-2  flex-col h-[110px] justify-between">
            <p className="text-3xl font-bold">{teachers.length}</p>
            <p className="text-sm pt-[40px] font-semibold">Teachers</p>
          </div>
          <div className="w-[90px] h-[90px] tablet:w-[110px] bg-white tablet:h-[110px] rounded-full flex items-center justify-center">
            <div></div>
            <GiTeacher className="text-[#1bc5d1]" size={60} />
          </div>
        </div>
      </div>
      {/* COmbination of simple line and pie chart */}
      <div className="w-[100%] mt-6 flex flex-col laptop:flex-row justify-between items-center gap-4">
        {/* SimpleLineBarGrapph section */}
        <div className="w-[90%] tablet-w[70%] laptop:w-[63%] h-[350px] flex  justify-center items-center rounded-2xl shadow-[#e9e9e9] shadow-xl px-[10px]  ">
              <table className="w-full text-sm text-left flex flex-col rtl:text-right text-gray-500 ">
                <thead className="w-full text-xs text-gray-700 uppercase bg-[#f3f3f3] flex">
                  <tr className="w-full flex">
                    <th scope="col" className="px-4 py-2 w-[25%]"></th>
                    <th scope="col" className="px-4 py-2 w-[25%]">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-2 w-[25%]">
                      Total Transactions
                    </th>
                    <th scope="col" className="px-4 py-2 w-[25%]">
                      Net worth
                    </th>
                  </tr>
                </thead>
                <tbody className="h-[350px] w-full overflow-y-scroll scrollbar-thin  scrollbar-thumb-[#420177] flex flex-col">
                  {transactions.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr
                        className="bg-white border-b w-full flex"
                        style={{ minHeight: "40px" }}
                      >
                        <td scope="row" className="px-4 py-2 w-[25%]">
                          <RiArrowDropDownLine
                            size={22}
                            onClick={() => toggleRow(index)}
                            className={`transform transition-transform ${
                              openRows.includes(index) ? "rotate-180" : ""
                            }`}
                          />
                        </td>
                        <td className="px-4 py-2 w-[25%]">
                          {format(new Date(item.todays_date), "dd MMMM yyyy")}
                        </td>
                        <td className="px-4 py-2 w-[25%]">
                          {item._count.amount}
                        </td>
                        <td className="px-4 py-2 w-[25%]">
                          NRP {item._sum.amount}
                        </td>
                      </tr>
                      {openRows.includes(index) &&
                        item.transactions.map((transaction, i) => {
                          const options = {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          };
                          const formattedDate = new Date(
                            transaction.createdAt
                          ).toLocaleString("en-US", options);
                          return (
                            <tr key={i} className="bg-gray-100 flex w-full">
                              <td
                                scope="row"
                                className="px-4 py-2 w-[25%]"
                              ></td>
                              <td className="px-4 py-2 w-[25%]">
                                {formattedDate}
                              </td>
                              <td className="px-4 py-2 w-[25%]">
                                <div className="inline-block">
                                  {transaction.amount > 0 ? (
                                    <FaArrowDown className="text-[green]" />
                                  ) : (
                                    <FaArrowUp className="text-[red]" />
                                  )}
                                </div>{" "}
                                NRP {transaction.amount}
                              </td>
                              <td className="px-4 py-2 w-[25%]">{transaction.purpose}</td>
                            </tr>
                          );
                        })}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
        {/* PieChartWithPaddingAngle section */}
        <div className="w-[90%] tablet:w-[70%] laptop:w-[28%] h-[350px] rounded-2xl shadow-[#e9e9e9] shadow-xl flex flex-col justify-center items-center">
          <PieChartWithPaddingAngle data={PieChartData} />
          <div className="w-[100%] h-[40px] pb-[60px] flex flex-col tablet:flex-row justify-around items-center">
            <div className="tablet:w-[30%] flex justify-center items-center gap-2">
              <div className="bg-[orange] h-[10px] w-[10px] rounded-full"></div>
              <span className="text-black font-10">Male</span>
              <span className="text-black font-12 font-semibold">{(male )}</span>
            </div>
            <div className="tablet:w-[30%] flex justify-center items-center gap-2">
              <div className="bg-[#00ccff] h-[10px] w-[10px] rounded-full"></div>
              <span className="text-black font-10">Female</span>
              <span className="text-black font-12 font-semibold">{(female)}</span>
            </div>
            <div className="tablet:w-[30%] flex  items-center justify-center gap-2">
              <div className="bg-[#dadada] h-[10px] w-[10px] rounded-full"></div>
              <span className="text-black font-10">Others</span>
              <span className="text-black font-12 font-semibold">{(others)}</span>
            </div>
          </div>
        </div>
      </div>
      {/* COmpletion of combination of simple line and pie chart */}

      {/* Combination of bargraph and latest payment starts */}
      <div className="w-[100%] mt-6 flex flex-col laptop:flex-row justify-between items-center gap-4">
        {/* Bargraph section starts here */}
        <div className="w-[90%] tablet:w-[70%] laptop:w-[63%] h-[280px] rounded-2xl shadow-[#e9e9e9] shadow-xl flex flex-col">
        <div className="w-[100%] h-[40px] flex justify-end pr-5 gap-3">
            <div className="w-[130px] h-[100%] bg-[#fc9003] rounded-3xl flex items-center justify-center text-white font-semibold">
              Gained
            </div>
            <div className="w-[130px] h-[100%] bg-[#1bc5d1] rounded-3xl flex items-center justify-center text-white font-semibold">
              Lossed
            </div>
          </div>
          <div className="w-[100%] h-[230px]">
            <SimpleLineChart data={monthlyTransactions} />
          </div>
          {/* <div className="w-[90%] h-[100%] flex justify-end items-end">
            <BarChartGraph className="w-[100%] h-[100%] pl-4" data={barData} />
           
          </div> */}
        </div>

        {/* Latest Payment section starts here */}
        <div className="w-[90%] tablet:w-[70%] laptop:w-[28%] h-[280px] rounded-2xl shadow-[#e9e9e9] shadow-xl flex flex-col">
          <div className="w-[100%] h-[40px] flex justify-between">
            <div className="font-bold pl-5"> Latest Payment</div>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
          {credited.map((credit,index)=>{
                let name=''
                let gender=''
                if(credit.feePayment!=null){
                  name=`${credit.feePayment.student.firstName} ${credit.feePayment.student.lastName}`
                  gender=`${credit.feePayment.student.gender}`
                }
                else if(credit.salaryPayment!=null){
                  if(credit.salaryPayment.teacher!=null){
                    name=`${credit.salaryPayment.teacher.name}`
                    gender=`${credit.salaryPayment.teacher.gender}`
                  }
                  else if(credit.salaryPayment.frontDesk){
                    name=`${credit.salaryPayment.frontDesk.name}`
                    gender=`${credit.salaryPayment.frontDesk.gender}`

                  }
                  else if(credit.salaryPayment.accountant){
                    name=`${credit.salaryPayment.accountant.name}`
                    gender=`${credit.salaryPayment.accountant.gender}`
                  }
                }
                return (
              <div className="w-[80%] h-[70px] rounded-2xl bg-[#f8f8f8] shadow-lg flex justify-start items-center gap-3" key={index}>
                <div className="h-[40px] w-[40px] ml-8 rounded-full">
                <img src={`${gender==='Female'?'/female.png':'/profile1.jpeg'}`} className="h-[100%] w-[100%] rounded-full"></img>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[17px]">{name}</span>
                  <span className="text-[orange] font-semibold text-[13px]">NRP {credit.amount}</span>
                </div>
              </div>
                )
              })}
      
          </div>
        </div>
      </div>
        
        </>
      )
      }
      {/* Combination of bargraph and latest payment ends */}
    </div>
  );
};

export default page;
