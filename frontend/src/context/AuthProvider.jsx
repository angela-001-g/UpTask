/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [charging, setCharging] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token')
            if(!token){
                setCharging(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clientAxios('/users/profile', config)
                setAuth(data)
                navigate('/projects')
            } catch (error) {
                setAuth({})
            }

            setCharging(false)

        }
        authenticateUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                charging
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext