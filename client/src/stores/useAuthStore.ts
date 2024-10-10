import { create } from "zustand";
import AuthToken from "../types/AuthToken";

interface AuthState {
    accessToken : string|null,
    refreshToken : string|null,

    setAccessToken : (token : string) => void,
    clearAccessToken : () => void,
    setRefreshToken : (token : string) => void,
    clearRefreshToken : () => void,
    setTokens : (token : AuthToken) => void,
    clearTokens : () => void,
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    setAccessToken: (token) => set({ accessToken: token }),
    clearAccessToken: () => set({ accessToken: null }),

    refreshToken : null,
    setRefreshToken : (token) => set({refreshToken : token}), 
    clearRefreshToken : () => set({refreshToken : null}), 

    setTokens : (token : AuthToken) => set({
        refreshToken: token.refreshToken,
        accessToken : token.accessToken
    }),
    clearTokens : () => set({
        refreshToken : null,
        accessToken : null
    })
}));
