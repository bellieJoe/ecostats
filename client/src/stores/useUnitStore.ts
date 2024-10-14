import { VoidFunctionComponent } from "react";
import { Unit } from "../types/Unit";
import { create } from "zustand";

interface ViewUnits {
    units : Unit[],
    programId : string | null,
    programName : string | null,
    page : number,
    limit : number,
    total : number,

    setUnits : (untis : Unit[]) => void,
    setProgram : (id:string, name:string) => void,
    setPage : (page : number) => void,
    setLimit : (limit : number) => void,
    setTotal : (total : number) => void
}

export const useViewUnitsStore = create<ViewUnits>(set => ({
    units : [],
    programId : null,
    programName : null,
    page : 1,
    limit : 10,
    total : 0,

    setUnits : (units) => {
        set({units : units})
    },
    setProgram: (id, name) => {
        set({programId : id, programName : name})
    },
    setPage : (page) => {
        set({page:page})
    },
    setLimit : (limit) => {
        set({limit:limit})
    },
    setTotal : (total) => {
        set({total : total})
    }
}))