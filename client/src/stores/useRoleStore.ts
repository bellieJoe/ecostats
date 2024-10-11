import { create } from "zustand";
import { Role } from "../types/Role";

interface RoleState {
    roles : Role[],

    setRoles : (roles : Role[]) => void,
    clearRoles : () => void
}

export const useRoleStore = create<RoleState>((set) => ({
    roles : [],
    setRoles : (roles) => set({roles}),
    clearRoles : () => set({roles: []})
}));
