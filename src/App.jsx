import './styles/App.css'
import Login,{Register} from './pages/Login'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/home'
import Products from './pages/products'
import Blogs from './pages/blogs'
import Cart from './pages/cart'
import Wishlist from './pages/wishlist'
import OrderSummary from './pages/ordersummary'
import OrderSec from './pages/success'
import Orders from './pages/orders'
import Forgot from './components/forget'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path={'/signup'} element ={<Register/>}/>
      <Route path={'/login'} element ={<Login/>}/>
      <Route path={'/products'} element={<Products />} />
      <Route path={'/blogs'} element={<Blogs />} />
      <Route path={'/cart'} element ={<Cart />} />
      <Route path={'/wishlist'} element ={<Wishlist/>} />
      <Route path={'/orderSummary'} element ={<OrderSummary/>} />
      <Route path={'/confirm'} element={<OrderSec/>} />
      <Route path={'/orders'} element ={<Orders/>} />
      <Route path={'/forgot'} element = {<Forgot/>} />
    </Routes>
    </>
  )
}

export default App
