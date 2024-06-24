"use client"
import { useSelector } from "react-redux"
import { CircularProgress } from "@mui/joy"
import Navbar from "./Components/Navbar"
// export const metadata={
//     title:'ABM',
//     description:'Generated by freelancers',
// }

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
        <main className="flex min-h-[90vh]">
            {children}
        </main>
        </>
    )    
    }
    </div>
)
}