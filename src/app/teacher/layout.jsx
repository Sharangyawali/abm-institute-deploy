"use client"
import { useSelector } from "react-redux"
import { CircularProgress } from "@mui/joy"
import Navbar from "./Components/Navbar"

export default function RootPublicPortalLayout({children}){
    const loading=useSelector((state)=>state.loadingShow.loading)
    return(
        <div className="w-[100%] flex flex-col ">
        {loading?
        <div className="w-[100%] h-[100vh] flex justify-center items-center ">
            <CircularProgress/>
        </div>
    :
    (
        <>
        <Navbar/>
        <main className="flex">
            {children}
        </main>
        </>
    )    
    }
    </div>
    )
}