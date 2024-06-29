"use client";
import { CircularProgress } from "@mui/joy";
import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { format } from "date-fns";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import SimpleLineChart from "@/app/admin/components/SimpleLineChart";
import { IoMdArrowDropdown } from "react-icons/io";

const Page = () => {
  const [openRows, setOpenRows] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const[monthlyTransactions,setMonthlyTransactions]=useState([])
  const[debited,setDebited]=useState([])
  const [credited,setCredited]=useState([])
  const [dailyTransactions,setDailyTransactions]=useState([])
  const [weeklyTransactions,setWeeklyTransactions]=useState([])
  const [monthlyTotalTransactions,setMonthlyTotalTransactions]=useState([])
  const [showOptions, setShowOptions] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Daily");
  useEffect(() => {
    getPayments();
  }, []);
  const time=[{name:'Daily',value:'Daily'},{name:'Weekly',value:'Weekly'},{name:'Monthly',value:'Monthly'}]

  const getPayments = async () => {
    let result = await fetch("/api/accountant/payment", {
      method: "get",
    });
    result = await result.json();
    if (result.success === true) {
      setTransactions(result.transactions);
      setDailyTransactions(result.transactions)
      setWeeklyTransactions(result.weekly)
      setMonthlyTotalTransactions(result.monthly)
      getMonthlyTransactions();
    }
  };

  const handleChangeTime=(time)=>{
    setSelectedTime(time)
    if(time==='Daily'){
     setTransactions(dailyTransactions)
    }
    else if(time==='Weekly'){
     setTransactions(weeklyTransactions)
    }
    else if(time==='Monthly'){
     setTransactions(monthlyTotalTransactions)
    }
    setShowOptions(false)
   }

  const getMonthlyTransactions=async ()=>{
    let result=await fetch("/api/accountant/monthlyTransaction",{
      method:"get"
    })
    result=await result.json();
    if(result.success===true){
      setMonthlyTransactions(result.transactions)
      getLatestTransaction()
    }
  }

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



  const toggleRow = (index) => {
    setOpenRows((prevOpenRows) =>
      prevOpenRows.includes(index)
        ? prevOpenRows.filter((i) => i !== index)
        : [...prevOpenRows, index]
    );
  };

  return (
    <div className="w-[100%] flex flex-col p-[20px] items-center justify-center">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="w-[100%] flex flex-col laptop:flex-row gap-[20px] justify-evenly items-center">
            <div className="w-[90%] tablet-w[70%] laptop:w-[63%] h-[400px] flex flex-col  justify-center items-start rounded-2xl shadow-[#e9e9e9] shadow-xl px-[10px]  ">
            <div className="relative text-[15px] flex flex-col h-[50px] font-semibold w-[125px]">
            <div
              className="flex justify-between items-center w-[100%]"
              onClick={() => setShowOptions(!showOptions)}
            >
              <div>{selectedTime}</div>
              <IoMdArrowDropdown className="ml-[8px]" size={25} />
            </div>
            {showOptions && (
              <div className="absolute h-[100px] top-[30px] w-[135px] flex flex-col justify-start rounded-md bg-[#e9e9e9] z-[99] right-[0px]">
                {time.map((tim, index) => (
                  <div
                    className="w-[100%] h-[33px] text-black border-[#3a3a3a] hover:bg-[#cecdcd] tablet:px-[5px] flex justify-start cursor-pointer"
                    key={index}
                    onClick={() => handleChangeTime(tim.value)}
                  >
                    {tim.name}
                  </div>
                ))}
              </div>
            )}
          </div>

              <table className="w-full text-sm text-left flex flex-col rtl:text-right text-gray-500 ">
                <thead className="w-full text-xs text-gray-700 uppercase bg-[#e6e6e6] flex">
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
                        {selectedTime==='Daily'? format(new Date(item.todays_date), "dd MMMM yyyy"):selectedTime==='Monthly'?item.month:selectedTime==='Weekly'?item.week:''}
                        </td>
                        <td className="px-4 py-2 w-[25%]">
                        {selectedTime==='Daily'?item._count.amount:item.count}
                        </td>
                        <td className="px-4 py-2 w-[25%]">
                          NRP {selectedTime==='Daily'?item._sum.amount:item.total_amount}
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
            <div className="w-[90%] tablet:w-[70%] laptop:w-[30%]  h-[400px] flex justify-center items-center rounded-2xl shadow-[#e9e9e9] shadow-xl  flex-col">
            <div className="w-[100%] h-[40px] flex justify-center">
              <div className="font-bold pl-5"> Latest Credit</div>
            </div>
            <div className="flex w-[100%] flex-col gap-2 justify-center items-center">
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
              <div className="w-[80%] h-[90px] rounded-2xl bg-[#f8f8f8] shadow-lg flex justify-start items-center gap-3" key={index}>
                <div className="h-[40px] w-[40px] ml-8 rounded-full">
                <img src={`${gender==='Female'?'female.png':'/profile1.jpeg'}`} className="h-[100%] w-[100%] rounded-full"></img>
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
          <div className="w-[100%] flex flex-col laptop:flex-row gap-[20px] justify-evenly items-center">
            <div className="w-[90%] tablet:w-[70%] laptop:w-[63%] h-[400px] flex justify-evenly items-center rounded-2xl shadow-[#e9e9e9] shadow-xl px-[10px]  flex-col">
            <div className="w-[100%] h-[50px] flex justify-start pr-5 gap-3">
            <div className="w-[130px] h-[100%] bg-[#fc9003] rounded-3xl flex items-center justify-center text-white font-semibold">
              Gained
            </div>
            <div className="w-[130px] h-[100%] bg-[#1bc5d1] rounded-3xl flex items-center justify-center text-white font-semibold">
              Lossed
            </div>
          </div>
          <div className="w-[100%] h-[300px]">
            <SimpleLineChart data={monthlyTransactions} />
          </div>     
            </div>
            <div className="w-[90%] tablet:w-[70%] laptop:w-[30%] h-[400px] flex items-center justify-center rounded-2xl shadow-[#e9e9e9] shadow-xl  flex-col gap-[10px]">
            <div className="w-[100%] h-[40px] flex justify-center">
              <div className="font-bold pl-5"> Latest Debit</div>
            </div>
            <div className="flex w-[100%] flex-col gap-2 justify-center items-center">
            {debited.map((credit,index)=>{
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
              <div className="w-[80%] h-[90px] rounded-2xl bg-[#f8f8f8] shadow-lg flex justify-start items-center gap-3" key={index}>
                <div className="h-[40px] w-[40px] ml-8 rounded-full">
                <img src={`${gender==='Female'?'female.png':'/profile1.jpeg'}`} className="h-[100%] w-[100%] rounded-full"></img>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[17px]">{name}</span>
                  <span className="text-[orange] font-semibold text-[13px]">NRP {Math.abs(credit.amount)}</span>
                </div>
              </div>
                )
              })}
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
