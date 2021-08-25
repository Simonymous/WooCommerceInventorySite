import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useState } from "react";

const Login = (props:any) => {
    const {onLoggedIn} = props
    const [consumerKey, setConsumerKey] = useState("");
    const [consumerSecret, setConsumerSecret] = useState("");

    const handleLogin = () => {
        const new_api = new WooCommerceRestApi({
          url: "https://www.fromfalltospring.shop",
          consumerKey: consumerKey,
          consumerSecret: consumerSecret,
          version: "wc/v3"
        });
        onLoggedIn(new_api)
    }

    return (
        <div>
            <h1>FFTS Inventory Login</h1>
            <label>Consumer-Key:</label>
            <input value={consumerKey} onChange={(e)=>{setConsumerKey(e.target.value)}}></input>
            <label>Consumer-Secret:</label>
            <input value={consumerSecret} onChange={(e)=>{setConsumerSecret(e.target.value)}}></input>
            <button onClick={handleLogin}>Login</button>
        </div>

    )
}

export default Login