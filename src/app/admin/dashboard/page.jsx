import React from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import SimpleLineChart from "../components/SimpleLineChart";
import PieChartWithPaddingAngle from "../components/PieChartWithPaddingAngle";
import BarChartGraph from "../components/BarChartGraph";
const page = () => {
  const Linedata = [
    {
      name: "Week 1",
      present: 1000,
      absent: 2400,
      amt: 2400,
    },
    {
      name: "Week 2",
      present: 3000,
      absent: 1398,
      amt: 2210,
    },
    {
      name: "Week 3",
      present: 2000,
      absent: 9800,
      amt: 2290,
    },
    {
      name: "Week 4",
      present: 2780,
      absent: 3908,
      amt: 2000,
    },
    {
      name: "Week 5",
      present: 1890,
      absent: 4800,
      amt: 2181,
    },
    {
      name: "Week 6",
      present: 2390,
      absent: 3800,
      amt: 2500,
    },
  ];
  const PieChartData = [
    { name: "Male", value: 40 },
    { name: "Female", value: 55 },
    { name: "Others", value: 5 },
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
  return (
    <div className="w-[100%] bg-[white] laptop:px-7 flex flex-col justify-around items-center">
      <div className=" w-[100%] flex flex-col laptop:flex-row justify-between items-center gap-4">
        <div className=" w-[90%] tablet:w-[70%] laptop:w-[25%] h-[160px] bg-gradient-to-r from-orange-400 to-orange-100 rounded-3xl shadow-xl shadow-orange-200 flex justify-between px-4 tablet:px-12 items-center">
          <div className="text-[white] pt-2  flex-col h-[80px] tablet:h-[110px] justify-between">
            <p className="text-3xl font-bold">1264</p>
            <p className="text-sm pt-[40px] font-semibold">Staffs</p>
          </div>
          <div className="w-[90px] h-[90px] tablet:w-[110px] bg-white tablet:h-[110px]  rounded-full flex items-center justify-center">
            <FaUsers className="text-orange-400" size={60} />
          </div>
        </div>
        <div className="w-[90%] tablet:w-[70%] laptop:w-[25%] h-[160px] bg-gradient-to-r from-[#a200ff] to-[#e2c5f7] rounded-3xl shadow-xl shadow-[#f8b7f8] flex justify-between px-4 tablet:px-12 items-center">
          <div className="text-[white] pt-2  flex-col h-[110px] justify-between">
            <p className="text-3xl font-bold">126</p>
            <p className="text-sm pt-[40px] font-semibold">Students</p>
          </div>
          <div className="w-[90px] h-[90px] tablet:w-[110px] bg-white tablet:h-[110px] rounded-full flex items-center justify-center">
            <FaGraduationCap className="text-[#a44eaf]" size={60} />
          </div>
        </div>
        <div className="w-[90%] tablet:w-[70%] laptop:w-[25%] h-[160px] bg-gradient-to-r from-[#00eeff] to-[#c3ebf7] rounded-3xl shadow-xl shadow-[#9decf1] flex justify-between px-4 tablet:px-12 items-center">
          <div className="text-[white] pt-2  flex-col h-[110px] justify-between">
            <p className="text-3xl font-bold">126</p>
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
        <div className="w-[90%] tablet:w-[70%] laptop:w-[63%] h-[350px] rounded-2xl shadow-[#e9e9e9] shadow-xl flex flex-col">
          <div className="w-[100%] h-[50px] flex justify-end pr-5 gap-3">
            <div className="w-[130px] h-[100%] bg-[#fc9003] rounded-3xl flex items-center justify-center text-white font-semibold">
              Present
            </div>
            <div className="w-[130px] h-[100%] bg-[#1bc5d1] rounded-3xl flex items-center justify-center text-white font-semibold">
              Absent
            </div>
          </div>
          <div className="w-[100%] h-[300px]">
            <SimpleLineChart data={Linedata} />
          </div>
        </div>
        {/* PieChartWithPaddingAngle section */}
        <div className="w-[90%] tablet:w-[70%] laptop:w-[28%] h-[350px] rounded-2xl shadow-[#e9e9e9] shadow-xl flex flex-col justify-center items-center">
          <PieChartWithPaddingAngle data={PieChartData} />
          <div className="w-[100%] h-[40px] pb-[60px] flex flex-col tablet:flex-row justify-around items-center">
            <div className="tablet:w-[30%] flex justify-center items-center gap-2">
              <div className="bg-[orange] h-[10px] w-[10px] rounded-full"></div>
              <span className="text-black font-10">Male</span>
              <span className="text-black font-12 font-semibold">40%</span>
            </div>
            <div className="tablet:w-[30%] flex justify-center items-center gap-2">
              <div className="bg-[#00ccff] h-[10px] w-[10px] rounded-full"></div>
              <span className="text-black font-10">Female</span>
              <span className="text-black font-12 font-semibold">55%</span>
            </div>
            <div className="tablet:w-[30%] flex  items-center justify-center gap-2">
              <div className="bg-[#dadada] h-[10px] w-[10px] rounded-full"></div>
              <span className="text-black font-10">Others</span>
              <span className="text-black font-12 font-semibold">5%</span>
            </div>
          </div>
        </div>
      </div>
{/* COmpletion of combination of simple line and pie chart */}

{/* Combination of bargraph and latest payment starts */}
      <div className="w-[100%] mt-6 flex flex-col laptop:flex-row justify-between items-center gap-4">

        {/* Bargraph section starts here */}
        <div className="w-[90%] tablet:w-[70%] laptop:w-[63%] h-[280px] rounded-2xl shadow-[#e9e9e9] shadow-xl flex flex-col">
          <div className="w-[100%] h-[40px] flex justify-between">
            <div className="font-bold pl-5">Subject Task</div>
            <div className=" hidden laptop:flex justify-end gap-3">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[15px] h-[15px] bg-[orange] "></div>
                <span className="text-xs font-semibold">Brand1</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                <div className="w-[15px] h-[15px] bg-[#0044ff] "></div>
                <span className="text-xs font-semibold">Brand2</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                <div className="w-[15px] h-[15px] bg-[#c300ff] "></div>
                <span className="text-xs font-semibold">Brand3</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                <div className="w-[15px] h-[15px] bg-[#00e1ff] "></div>
                <span className="text-xs font-semibold">Brand4</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                <div className="w-[15px] h-[15px] bg-[#cfcfce] "></div>
                <span className="text-xs font-semibold">Brand5</span>
              </div>
            </div>
          </div>
          <div className="w-[90%] h-[100%] flex justify-end items-end">
            <BarChartGraph className="w-[100%] h-[100%] pl-4" data={barData} />
            {/* bar here */}
          </div>
        </div>

        {/* Latest Payment section starts here */}
        <div className="w-[90%] tablet:w-[70%] laptop:w-[28%] h-[280px] rounded-2xl shadow-[#e9e9e9] shadow-xl flex flex-col">
            <div className="w-[100%] h-[40px] flex justify-between">
              <div className="font-bold pl-5"> Latest Payment</div>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="w-[80%] h-[70px] rounded-2xl bg-[#f8f8f8] shadow-lg flex justify-start items-center gap-3">
                <div className="h-[40px] w-[40px] ml-8 rounded-full">
                <img src='/profile1.jpeg' className="h-[100%] w-[100%] rounded-full"></img>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[17px]">Ram Sharma</span>
                  <span className="text-[orange] font-semibold text-[13px]">NRP 5,000</span>
                </div>
              </div>
              <div className="w-[80%] h-[70px] rounded-2xl bg-[#f8f8f8] shadow-lg flex justify-start items-center gap-3">
                <div className="h-[40px] w-[40px] ml-8 rounded-full ">
                  <img src='/profile1.avif' className="h-[100%] w-[100%] rounded-full"></img>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[17px]">Shyam Sharma</span>
                  <span className="text-[orange] font-semibold text-[13px]">NRP 8,000</span>
                </div>
              </div>
              <div className="w-[80%] h-[70px] rounded-2xl bg-[#f8f8f8] shadow-lg flex justify-start items-center gap-3">
                <div className="h-[40px] w-[40px] ml-8 rounded-full ">
                <img src='/profile1.jpeg' className="h-[100%] w-[100%] rounded-full"></img>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[17px]">Hari Sharma</span>
                  <span className="text-[orange] font-semibold text-[13px]">NRP 3,000</span>
                </div>
              </div>

            </div>
        </div>
      </div>
{/* Combination of bargraph and latest payment ends */}


    </div>
  );
};

export default page;
