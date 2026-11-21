import { createContext,useState,useEffect,useContext } from "react";
import { loginUser } from "../services/authService";


export const AuthContext=createContext()


export const AuthProvider=({children})=>{

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    useEffect(() => {
        const savedToken = sessionStorage.getItem("token");

        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const login = async (credentials) => {
        const result=await loginUser(credentials)
        sessionStorage.setItem("token", result.token);
        setUser({
            userId:result.userId,
            username:result.username,
            email:result.email
        })
        setToken(result.token);

        return result;
    };

    const logout=()=>{
        setToken(null);
        setUser(null);
        sessionStorage.removeItem("token");
    }

    export const useAuth = () => {
        const context = useContext(AuthContext);

        if (!context) {
            throw new Error("useAuth must be used within AuthProvider");
        }

        return context;
    };
    return (
    <AuthContext.Provider value={{ user, token, login,logout }}>
        {children}
    </AuthContext.Provider>
);
}