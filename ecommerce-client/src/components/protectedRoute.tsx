import { PropsWithChildren, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router"

const ProtectedRoutes = ({children}: PropsWithChildren) => {
    const {user, isLoading, refreshTokenHandler} = useAuth()
  
    useEffect(() => {
      refreshTokenHandler()
    }, [])
  
    if (!isLoading && !user) {
      return <Navigate to="/login" replace/>
    }
    
    return children;
  }
  
  export default ProtectedRoutes