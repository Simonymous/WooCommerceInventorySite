import './App.css';
import { useState } from 'react';
import Login from './Login';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Inventory from './Inventory';
import CircularProgress from '@material-ui/core/CircularProgress';

function App() {


  const init_api = new WooCommerceRestApi({
    url: "https://www.fromfalltospring.shop",
    consumerKey: "a",
    consumerSecret: "b",
    version: "wc/v3"
  });

  const [products, setProducts] = useState<any[]>([]);
  const [api, setApi] = useState(init_api)
  const [spinnerVisible, setSpinnerVisible] = useState(false)

  const onLoggedIn = (consumerKey:string,consumerSecret:string) => {
    setSpinnerVisible(true)

    const new_api = new WooCommerceRestApi({
      url: "https://www.fromfalltospring.shop",
      consumerKey: consumerKey,
      consumerSecret: consumerSecret,
      version: "wc/v3"
    });
    setApi(new_api)

    new_api.get("products").then((res:any)=> {
        const { data } = res
        setProducts(data)
    })
    .catch((error) => {
      alert("Failed To Login!")
      setSpinnerVisible(false)
      console.log(error)
  })
  }



  if(products.length > 0) {
    return (
      <Inventory products={products} api={api}/>
    )
  } else {
    return (
      <div>
        <Login onLoggedIn={onLoggedIn}/>
        {
          spinnerVisible &&
          <CircularProgress />
        }

      </div>

    );
  }
}

export default App;
