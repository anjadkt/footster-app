import { useEffect, useState } from "react"
import SideBar from "../components/sidebar"
import '../styles/dashboard.css'
import axios from "axios";

export default function Dashboard(){
  const [data,setData] = useState({});

  async function takeData() {
    const products = await axios.get('http://localhost:5000/products');
    const users = await axios.get('http://localhost:5000/users');

    const calOrders = () =>{
      let orderCount = 0;
      users.data.forEach((v)=>{
        orderCount += v.orders.length
      });
      return orderCount;
    }

    setData({ 
      products : products.data.length,
      userCount : users?.data.length,
      orders : calOrders()
    });

  }
  useEffect(()=>{
    takeData();
    document.title = "Admin panel"
  },[]);
  
  console.log(data)
  return(
    <>
     <SideBar />
     <div className="dashboard-all-container">
      <h1>Dashboard</h1>
      <hr />
      <div className="dashboard-details-container">
        <div className="dashboard-cus-or-pro-container">
          <div>
            <img src="./icons/users.png" alt="users" />
            <div>Customers</div>
            <h2>{ data.userCount}</h2>
          </div>
          <div>
            <img src="./icons/orders.png" alt="orders" />
            <div>Orders</div>
            <h2>{data.orders}</h2>
          </div>
          <div>
            <img src="./icons/products.png" alt="products" />
            <div>Products</div>
            <h2>{ data.products}</h2>
          </div>
        </div>
        <div></div>
      </div>
     </div>
    </>
  )
}