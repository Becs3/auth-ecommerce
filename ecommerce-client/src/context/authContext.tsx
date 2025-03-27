import { createContext, PropsWithChildren, useRef, useState } from "react";
import { User } from "../models/user";
import { clearTokens, refreshToken, signInToken } from "../service/authService";
import axios from "axios";

type AuthContextType = {
    user: User | null,
    isLoading: boolean,
    login: () => void,
    logout: () => void,
    refreshTokenHandler: () => void
  }
  
  const AuthContext = createContext< AuthContextType | undefined>(undefined)
  
  
  export const AuthProvider = ({children}: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const timeoutID = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  
    const login = async () => {
      setIsLoading(true)
      try {
        const response = await signInToken()
        console.log(response)
        axios.defaults.headers.common['Authorization'] = "Bearer " + response.token
        setUser(response.user)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    const logout = async () => {
      setIsLoading(true)
      try {
        await clearTokens()
        if (timeoutID.current) {
          clearTimeout(timeoutID.current)
          timeoutID.current = null;
        }
        setUser(null)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    const refreshTokenHandler = async () => {
      setIsLoading(true)
      try {
        const response = await refreshToken()
        console.log(response)
        axios.defaults.headers.common['Authorization'] = "Bearer " + response.token
  
        if (timeoutID.current) clearTimeout(timeoutID.current)
        timeoutID.current = setTimeout(() => refreshTokenHandler(), 1000 * response.expires_in) // runs every 10 sec
        setUser(response.user)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    } 
  
    return (
      <AuthContext.Provider value={{login,logout, refreshTokenHandler, user, isLoading}}>
        {children}
      </AuthContext.Provider>
    )
  } 
  
  
  export default AuthContext