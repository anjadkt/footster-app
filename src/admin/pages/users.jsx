import axios from "axios";
import SideBar from "../components/sidebar";
import { useEffect, useState } from "react";
import '../styles/users.css'
import { useNavigate } from "react-router-dom";


export default function Users (){
  const [users,setUsers] = useState([]);
  const navigate = useNavigate();
  async function  fetchData() {
    const {data} = await axios.get('http://localhost:5000/users');
    data.shift();
    setUsers(data);
  }

  useEffect(()=>{
    fetchData();
  },[])
  return (
    <>
     <SideBar/>
     <div className="users-admin-container-div">
        <div className="header-admin-panel">
          <h1>Manage Users</h1>
          <input type="text" placeholder="Search Products"/>
        </div>
        <hr />
        <div className="alluser-admin-container-div">
          {
            users && users.map((v,i)=>(
              <div onClick={()=>navigate(`/users/${v.id}`)} className="user-info" key={i}>
                <p>ID : {v.id}</p>
                <p>Role : {v.role}</p>
                <h3>{v.name}</h3> 
                <p>{v.email}</p>
                <p>status : <span>{v.status}</span></p>
              </div>
            ))
          }
        </div>
     </div>
    </>
  )
}