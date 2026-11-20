import { createContext,useState } from "react";


export const AuthContext=createContext()


export const AuthProvider = ({ children }) => {
    <AuthContext.Provider value={{ user, token, login, logout }}>
    {children}
    </AuthContext.Provider>
};

export const AuthContext=createContext();

export const AuthProvider=({children})=>{

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
}