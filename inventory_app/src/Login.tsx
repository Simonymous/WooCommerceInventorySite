import { useState } from "react";

const Login = (props:any) => {
    const {onLoggedIn} = props
    const [consumerKey, setConsumerKey] = useState("");
    const [consumerSecret, setConsumerSecret] = useState("");

    const handleLogin = () => {
        onLoggedIn(consumerKey,consumerSecret)
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