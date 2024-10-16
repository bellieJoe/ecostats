import { create } from "zustand";
import { User } from "../types/User";
import Users from "../pages/Admin/Users/Users";

interface EditUserState { 
    user : User | null,
    userId : string|null,

    setUserId : (id:string) => void,
    setUser : (user: User) => void,
    clear : () => void
}

interface ViewUsersState { 
    users : User[]

    setUsers : (user: User[]) => void,
    clear : () => void
}

export const useEditUserStore = create<EditUserState>((set) => ({
    user : null,
    userId : null,

    setUserId : (id:string) => {
        set({userId:id})
    },
    setUser : (user: User) => {
        set({user: user})
    },
    clear: () => {
        set({
            user: null,
            userId: null
        })
    }

}));

export const useViewUsersStore = create<ViewUsersState>((set) => ({
    users : [],

    setUsers : (users: User[]) => {
        set({users : users})
    },
    clear : () => {
        set({users : []})
    }
}));
