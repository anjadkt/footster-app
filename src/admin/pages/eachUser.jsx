import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import SideBar from "../components/sidebar";
import '../styles/eachuser.css'

export default function EachUser(){
  const [user,setUser] = useState({});
  const {id} = useParams();
  async function fetchUser() {
    const {data} = await axios.get(`http://localhost:5000/users/${id}`);
    console.log(data)
    setUser(data);
  }

  function blockUser(){
    axios.put(`http://localhost:5000/users/${id}`,{
      ...user,
      status : user.status == "active"? "blocked" : "active"
    });
    fetchUser();
  }

  function setOrder(orderStatus){
    // axios.put(`http://localhost:5000/users/${id}`,{
    //   ...user,
    //   orders : {
    //     ...user.orders,
    //     status : orderStatus
    //   }
    // });
    // fetchUser();
  }

  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <>
     <SideBar/>
     <div className="all-user-info-container-div">
      <div className="user-info-container-div">
        <h1>{user.name}</h1>
        <p>ID : {user.id}</p>
        <p> Email - {user.email}</p>
        <p>status - <span className="user-status" style={{backgroundColor : user.status == "active" ? "#78eda5ff":"red"}}>{user.status}</span></p>
        <br />
        <button onClick={blockUser} className="block-user">{user.status == "active" ? "Block User": "Unblock User"}</button>
      </div>
      <div className="user-orders-container-div">
        {
          user && user.orders && user.orders.map((v,i)=>(
            <div key={i} className="user-admin-orders">
              <div className="user-admin-orders-details">
                <div>order ID :<br/>{v.orderId}</div>
                <div>Date : <br/>{v.date}</div>
                <div>Total Price : <br/>{v.total}</div>
                <div>Type : <br/>{v.type}</div>
                <div>Status : <br/>Order {v.status}</div>
              </div>
              <div className="user-admin-orders">
                {
                  v.cart.map((d,i)=>(
                    <div key={i} className="product-admin-order-details">
                      <div className="img-div"><img  src={`/products/shoe-${d.id}.png`} alt="name" /></div>
                      <div className="admin-products">
                        <div>{d.name}</div>
                        <div>Price : {d.price}</div>
                        <div>Quantity :{d.quantity}</div>
                        <div>Colros : {d.color}</div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="user-admin-shpping-details">
                <div style={{backgroundColor : v.status == "Placed" ? "green":"none"}}>Placed</div>
                <div onClick={()=>setOrder("Shipped")}>Shipped</div>
                <div onClick={()=>setOrder("Reached")}>Reached</div>
                <div onClick={()=>setOrder("Delivered")}>Delivered</div>
              </div>
            </div>
          ))
        }
      </div>
     </div>
    </>
  )
}