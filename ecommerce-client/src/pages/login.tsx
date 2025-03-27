import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {

    const {user, login, isLoading} = useAuth();

    if (!isLoading && user) {
        return <Navigate to="/admin" />
    }

    return(
        <>
        <button onClick={login}>Log In</button>
        </>
    )
}