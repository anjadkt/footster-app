import '../styles/products.css'
import Header from "../components/header"
import { useFetch } from "../customHooks/customHooks"
import Product from "../components/product"
import Title from '../components/title'

export default function Products(){
  const [products] = useFetch('http://localhost:5000/products');
  return(
    <>
     <Header />
     <main>
      <div className='category-selectors'>
        <button>All</button>
        <button>casuals</button>
        <button>sports</button>
        <button>indoor</button>
        <button>loafers</button>
        <button>boots</button>
        <button>sandels</button>
        <button>sneakers</button>
      </div>
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
      </div>
     </main>
    </>
  )
}