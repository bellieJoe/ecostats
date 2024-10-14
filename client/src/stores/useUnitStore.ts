import { VoidFunctionComponent } from "react";
import { Unit } from "../types/Unit";
import { create } from "zustand";
import { ValidationError } from "../types/ApiValidationError";
import { User } from "../types/User";

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
}));


interface UpdateUnitState {
    unit : Unit|null
    unitId : string | null
    errors : ValidationError[],
    formData : {
        id : string
        name : string
    }

    setFormData : (name:string, val:string) => void
    clear : () => void
    setUnit : (unit : Unit) => void
    setUnitId : (id : string) => void
    setErrors : (errors : ValidationError[]) => void
}


export const useUpdateUnitStore = create<UpdateUnitState>((set) => ({
    unit: null,
    unitId: null,
    errors: [],
    formData : {
        name : "",
        id : ""
    },
    
    setFormData : (name, val) => {

    },
    setUnit: function (unit: Unit): void {
        set({
            unit : unit,
            formData : {
                name : unit.name,
                id : unit._id
            }
        })
    },
    setUnitId: function (id: string): void {
        set({
            unitId : id,
        })
    },
    setErrors: function (errors: ValidationError[]): void {
        set({
            errors : errors
        })
    },
    clear: () => {
        set({
            unit : null,
            unitId : null,
            errors : []
        })
    }
}
));


interface UnitHeadState { 
    heads : User[] 
    unitId : string|null
    name : string|null
    setHeads : (users : User[]) => void
    setUnit : (id:string, name : string) => void
    clear : () => void
}

export const useUnitHeadStore = create<UnitHeadState>((set) => ({
    heads: [],
    unitId : null,
    name : null,

    setHeads : (users : User[]) => {
        set({heads : users})
    },

    setUnit : (id:string, name:string) => {
        set({unitId : id, name: name})
    },

    clear : () => {
        set({
            heads : [],
            unitId : null
        })
    }
}));