import axios from "axios";
import SideBar from "../components/sidebar";
import { useEffect, useState } from "react";
import '../styles/allorders.css'

export default function AdminOrders(){
  const [allUser,setAlluser] = useState([]);

  async function fetchData(){
    const {data} = await axios.get('http://localhost:5000/users');
    data.shift();
    setAlluser(data);
  }
  useEffect(()=>{
    fetchData();
  },[])


  return(
    <>
     <SideBar/>
     <div className="all-orders-admin-container">
      <h1>All Orders</h1>
      <hr />
      {
        allUser && allUser.map((user,i)=>(
          <div className="user-orders-container-div">
        {
          user.orders && user.orders.map((v,i)=>(
            <div key={i} className="user-admin-orders">
              <div className="user-admin-orders-details">
                <div>order ID :<br/>{v.orderId}</div>
                <div>Date : <br/>{v.date}</div>
                <div>Total Price : <br/>{v.total}</div>
                <div>Type : <br/>{v.type}</div>
                <div>Status : <br/>{v.status}</div>
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
                <div>Placed</div>
                <div>Shipped</div>
                <div>Reached</div>
                <div>Delivered</div>
              </div>
            </div>
          ))
        }
      </div>
        ))
      }
     </div>
      
    </>
  )
}