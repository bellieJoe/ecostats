import { useEffect, useState } from "react";
import { getTokensFromCookie, isAuthenticated } from "../../services/api/userApi";
import { Navigate, redirect } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

interface Props {
    children : any
    redirectTo? : string
}

const RouteGuard = (props : Props) => {
    const [isAuth, setIsAuth] = useState(true);
    const {setTokens} = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            const isAuthenticatedStatus = await isAuthenticated();
            setIsAuth(isAuthenticatedStatus);
            if(isAuthenticatedStatus){
                setTokens(getTokensFromCookie())
            }
        };

        checkAuth();
    }, [])

    return (
        <>
            {
                isAuth && props.redirectTo ? props.children  : (<Navigate to={props.redirectTo!} />)
            }
            {
                isAuth && !props.redirectTo && props.children 
            }
        </>
    )
}

export default RouteGuard;