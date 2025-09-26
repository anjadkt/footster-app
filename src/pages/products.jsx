import '../styles/products.css'
import Header from "../components/header"
import { useFetch } from "../customHooks/customHooks"
import Product from "../components/product"
import Title from '../components/title'

export default function Products(){
  const [products] = useFetch('http://localhost:5000/products?_page=1&_limit=24');
  return(
    <>
     <Header />
     <main>
      <div className='all-div'>
        <Title title={"All products"}/>
        <hr />
        <div className="all-products-container-div">
          { products &&
          products.map((e,i)=>(
            <Product key={i} data={e} />
          ))
          }
        </div>
        <Title title={"Branded products"} />
        <hr />
         <div className="all-products-container-div">
          { products &&
          products.map((e,i)=>(
            <Product key={i} data={e} />
          ))
          }
         </div>
      </div>
     </main>
    </>
  )
}