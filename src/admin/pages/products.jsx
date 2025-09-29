import { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import '../styles/products.css'
import axios from "axios";
import { useFetch } from "../../customHooks/customHooks";

export default function AllProducts (){
  
  const [products,setProducts] = useState([]);

  async function setData(){
    const {data} = await axios.get(' http://localhost:5000/products');
    
    setProducts(data);
  }

  useEffect(()=>{
    setData();
  },[])
  
  return (
    <>
     <SideBar/> 
     <div className="admin-allproducts-container">
      <h1>Manage Products</h1>
      <hr />
     <div className="form-table-admin-div">
        <form onSubmit={setData} className="admin-addproduct-form">
        <input required type="text" placeholder="Products Name" />
        <input required type="text" placeholder="Colors" />
        <input required type="number" placeholder="Price" />
        <input type="submit" value='Add Product' />
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Colors</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products && products.map((v,i)=>(
              <tr key={i}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.color}</td>
                <td>{v.price}</td>
                <td>
                  <button>Remove</button>
                  <button>Edit</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
     </div>
     </div>
    </>
  )
}