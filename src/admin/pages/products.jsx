import { useEffect, useRef, useState } from "react";
import SideBar from "../components/sidebar";
import '../styles/products.css'
import axios from "axios";

export default function AllProducts (){
  
  const [products,setProducts] = useState([]);
  let product = {}
  const inputElem = useRef({
    name : null,
    color : null,
    price : null,
    add : null

  })

  async function setData(){
    const {data} = await axios.get(' http://localhost:5000/products');
    setProducts(data);
  }

  function addProduct(e){
    if(inputElem.current.add.value == "Update Product"){
      axios.put(`http://localhost:5000/products/${product.id}`,{
        ...product,
        name: e.target[0].value ,
        color: e.target[1].value,
        price: e.target[2].value
      })
      return;
    }
    const {lastId} = products.pop();
    axios.post('http://localhost:5000/products',{
      id: lastId+1,
      isFav: false,
      quantity: 1,
      rating: 0,
      name: e.target[0].value ,
      color: e.target[1].value,
      price: e.target[2].value
    })
    setData();
  }

  function removeProduct(id){
    axios.delete(`http://localhost:5000/products/${id}`);
    setData();
  }

  async function editProduct(id){
    const {data} = await axios.get(`http://localhost:5000/products/${id}`);
    inputElem.current.name.value = data.name
    inputElem.current.color.value = data.color
    inputElem.current.price.value = data.price
    inputElem.current.add.value = "Update Product"
    product = data;
  }

  function searchProducts (s){
   const search = s.toLowerCase();
   const searched = products.filter((v)=> {
    const n = v.name.toLowerCase();
    return n.includes(search);
   } );
   setProducts(searched);
  }

  useEffect(()=>{
    setData();
  },[])
  
  return (
    <>
     <SideBar/> 
     <div className="admin-allproducts-container">
      <div className="header-admin-panel">
        <h1>Manage Products</h1>
        <input onChange={e => searchProducts(e.target.value)} type="text" placeholder="Search Products"/>
      </div>
      <hr />
     <div className="form-table-admin-div">
        <form onSubmit={(e)=>addProduct(e)} className="admin-addproduct-form">
        <input ref={e => inputElem.current.name = e} required type="text" placeholder="Products Name" />
        <input ref={e => inputElem.current.color = e} required type="number" placeholder="Colors" />
        <input ref={e => inputElem.current.price = e} required type="number" placeholder="Price" />
        <input ref={e=> inputElem.current.add = e} type="submit" value='Add Product' />
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
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
                  <button onClick={()=>removeProduct(v.id)}>Remove</button>
                  <button onClick={()=>editProduct(v.id)}>Edit</button>
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