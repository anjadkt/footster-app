import {Link, useNavigate} from 'react-router-dom'
import '../styles/home.css'
import '../styles/cart.css'
import CartItem from '../components/cartItems'
import { useEffect, useReducer, useState } from 'react';

export default function Cart(){
  const userObject = JSON.parse(localStorage.getItem('user'));
  const {cart,name} = userObject;
  const navigate = useNavigate();

  const [price,setTotal] = useState(calcPrice);

  const [userObj,dispatch] = useReducer(updateCart,userObject);

  function updateCart(userObj,action){
    const newObj = {...userObj,cart : [...userObj.cart]}
    switch (action.type){
      case "remove":
        newObj.cart = newObj.cart.filter((_,i)=> action.index !== i);
        return newObj;
      case "inc" :
        newObj.cart = newObj.cart.toSpliced(action.index,1,
          {...action.data,quantity : action.data.quantity + 1});
        return newObj;
      case "dec" :
        newObj.cart = newObj.cart.toSpliced(action.index,1,
          {...action.data,quantity : Math.max(action.data.quantity-1,1)});
        return newObj;
      default :
       return newObj ;
    }
  }

  function calcPrice (){
    const {cart} = JSON.parse(localStorage.getItem('user'));
    const priceObj = {
      items : 0,
      shipping : 0,
      beforTax : 0,
      tax : 0,
      total : 0 
    }
    cart.forEach(v =>{
      priceObj.items += v.price * v.quantity ;
    });
    priceObj.beforTax = priceObj.shipping + priceObj.items;
    priceObj.tax = Math.round(priceObj.items * 0.1) ;
    priceObj.total = priceObj.beforTax + priceObj.tax ;
    return priceObj ;
  }

  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(userObj));
    setTotal(calcPrice);
  },[userObj]);

  return (
    <>
     <header className='header-div'>
        <div className="logo-div">
          <Link className='nav-links' to='/'><h1>FootSter.</h1></Link>
        </div>
        <div className='cart-item'>
          <h2>{name}'s Cart (<span>{cart.length} Items</span>)</h2>
        </div>
        <div>
          <input className='cart-search-bar' type="text" placeholder='Search for products..' />
          <img className='cart-search-icon' src="./icons/search.png" alt="search for products.." />
        </div>
     </header>
     <h2 className='order-review'>Review your Order</h2>
     <div className='all-cart-items'>
        <div className="cart-items">
          {
            (cart.length === 0) ? (
              <h2 className='empty-cart'>(Cart is empty)</h2>
            ):(
              cart.map((v,i)=>(
                <CartItem dispatch={dispatch} index={i} key={i} data={v}/>
              ))
            )
          }
        </div>
        <div className='cart-order-summary'>
          <h3>Order Summary</h3>
          <div>
            <div>Items ({cart.length}):</div>
            <div>&#8377;{price.items}</div>
          </div>
          <div>
            <div>Shipping & handling:</div>
            <div>&#8377;{price.shipping}</div>
          </div>
          <div>
            <div>Total before tax:</div>
            <div>&#8377;{price.beforTax}</div>
          </div>
          <div>
            <div>Estimated tax (10%):</div>
            <div>&#8377;{price.tax}</div>
          </div>
          <hr />
          <div>
            <h4>Order total:</h4>
            <h4>&#8377;{price.total}</h4>
          </div>
          <div>
            <button onClick={()=>cart.length === 0 ? navigate('/') : navigate('/orderSummary')}>Place your Order</button>
          </div>
        </div>
     </div>
     {/* <h2 className='order-review'>Saved for Later Items</h2> */}
    </>
  )
}