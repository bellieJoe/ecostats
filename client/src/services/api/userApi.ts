import axios from "axios";
import AuthToken from "../../types/AuthToken";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../../stores/useAuthStore";

const apiUrl : string = import.meta.env.VITE_API_URL;


export const login = async (data : {email : string, password : string}) : Promise<AuthToken|null> => {
    try {
        const res = await axios.post(`${apiUrl}/users/login`, data);
        const authToken : AuthToken = {
            accessToken : res.data.accessToken,
            refreshToken : res.data.refreshToken
        }
        return authToken;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getAllUsers = async (page:number, limit:number) : Promise<any> => {
    try {
        const res = await axios.get(`${apiUrl}/users?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const refreshToken = async (data : {refreshToken : string}) : Promise<AuthToken|null> => {
    try {
        const res = await axios.post(`${apiUrl}/users/refresh-token`, data);
        const authToken : AuthToken = {
            accessToken : res.data.accessToken,
            refreshToken : res.data.refreshToken
        }
        return authToken;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const isAuthenticated =  async () : Promise<boolean> => {
    try {
        const _accessToken = Cookies.get("accessToken");
        const _refreshToken = Cookies.get("refreshToken")

        if(!_accessToken)
            return false;

        const decodedAccessToken = jwtDecode(_accessToken)
        const isExpired = decodedAccessToken.exp! * 1000 < Date.now();

        if(isExpired){
            Cookies.remove("accessToken");
            return false;
        }

        const newToken : AuthToken|null = await refreshToken({refreshToken: _refreshToken});
        if(!newToken){
            throw("Unable to refresh token")
        }
        Cookies.set("accessToken", newToken.accessToken, {expires: 7});
        Cookies.set("refreshToken", newToken.refreshToken, {expires: 7});

        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export const getTokensFromCookie = () : AuthToken => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken")
    return {
        accessToken,
        refreshToken
    }
}

export const signup = async (data : {email : string, password : string, name : string, userRole : string}) : Promise<void> => {
    await axios.post(`${apiUrl}/users/signup`, data);
}