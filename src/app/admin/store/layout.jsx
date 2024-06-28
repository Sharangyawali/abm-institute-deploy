import { Inter } from "next/font/google";
import TopBar from "./Component/TopBar";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
  };
  
export default function RootPublicPortalLayout({children}){
return(
    <div className="w-[100%] flex flex-col">
      <TopBar/>
      {children}
    </div>
)
}