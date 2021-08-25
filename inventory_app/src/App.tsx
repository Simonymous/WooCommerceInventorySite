import './App.css';
import { useState } from 'react';
import Login from './Login';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

function App() {


  const [products, setProducts] = useState(null);

  const [loggedIn,setLoggedIn] = useState(false);

  let api = null;
  const onLoggedIn = (new_api:WooCommerceRestApi) => {
    api = new_api;
    api.get("products")
    setLoggedIn(true)
  }


  if(loggedIn) {
    return (
      <div>Logged In</div>
    )
  } else {
    return (
      <Login onLoggedIn={onLoggedIn}/>
    );
  }
}

export default App;
