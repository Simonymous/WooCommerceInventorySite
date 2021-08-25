import './App.css';
import { useState } from 'react';
import Login from './Login';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Inventory from './Inventory';

function App() {


  const init_api = new WooCommerceRestApi({
    url: "https://www.fromfalltospring.shop",
    consumerKey: "a",
    consumerSecret: "b",
    version: "wc/v3"
  });

  const [products, setProducts] = useState(null);
  const [api, setApi] = useState(init_api)

  const onLoggedIn = (consumerKey:string,consumerSecret:string) => {

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
  }


  if(products) {
    return (
      <Inventory products={products} api={api}/>
    )
  } else {
    return (
      <Login onLoggedIn={onLoggedIn}/>
    );
  }
}

export default App;
