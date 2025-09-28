import { useEffect } from "react"
import SideBar from "../components/sidebar"

export default function Dashboard(){
  useEffect(()=>{
    document.title = "Admin panel"
  },[])
  return(
    <>
     <SideBar />
    </>
  )
}