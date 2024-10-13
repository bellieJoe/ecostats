import { create } from "zustand";
import { Program } from "../types/Program";
import { User } from "../types/User";

interface ProgramsStore { 
    programs : Program[] ,

    setPrograms : (programs: Program[]) => void,
    clear : () => void
}

interface ProgramHeadState { 
    heads : User[] 
    programId : string|null
    name : string|null
    setHeads : (users : User[]) => void
    setProgram : (id:string, name : string) => void
    clear : () => void
}


export const useProgramsStore = create<ProgramsStore>((set) => ({
    programs : [],

    setPrograms: (programs : Program[]) => {
        set({programs: programs})
    },

    clear: () => set({
        programs: []
    })

}));

export const useProgramHeadStore = create<ProgramHeadState>((set) => ({
    heads: [],
    programId : null,
    name : null,

    setHeads : (users : User[]) => {
        set({heads : users})
    },

    setProgram : (id:string, name:string) => {
        set({programId : id, name: name})
    },

    clear : () => {
        set({
            heads : [],
            programId : null
        })
    }
}))
