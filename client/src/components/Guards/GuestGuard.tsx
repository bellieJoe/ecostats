import { useEffect, useState } from "react";
import { getTokensFromCookie, isAuthenticated } from "../../services/api/userApi";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

interface Props {
    children : any
    redirectTo : string
}

const GuestGuard = (props : Props) => {
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
            {!isAuth ? props.children  : (<Navigate to={props.redirectTo} />)}
        </>
    )
}

export default GuestGuard;