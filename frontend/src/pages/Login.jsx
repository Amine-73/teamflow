import { useState } from "react";
import {useAuth} from "../context/AuthContext"


export const Login=()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } =useAuth();

    const handleSubmit=async (event)=>{
        event.preventDefault()
        setLoading(true);
        setError("");
        try {
            const credentials={
                email:email,
                password:password
            }
            await login(credentials)
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email :</label>
            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <label htmlFor="password">Password :</label>
            <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            {error && <p className="error-message" >{error}</p>}
            <button type="submit" disabled={loading}>{loading ? "Verify ...": "Login"}</button>
        </form>
    )
}