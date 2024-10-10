import { useEffect, useState } from "react";
import { getTokensFromCookie, isAuthenticated } from "../../services/api/userApi";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";


const RouteGuard = ({children}) => {
    const [isAuth, setIsAuth] = useState(true);
    const {setTokens} = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            const isAuthenticatedStatus = await isAuthenticated();
            console.log(isAuthenticatedStatus)  
            setIsAuth(isAuthenticatedStatus);
            if(isAuthenticatedStatus){
                setTokens(getTokensFromCookie())
            }
            console.log(isAuth)
        };

        checkAuth();
    }, [])

    return (
        <>
            {isAuth ? children  : (<Navigate to="/error/401" />)}
        </>
    )
}

export default RouteGuard;