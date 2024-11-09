import { create } from "zustand";


export const useAddReportConfigStore = create<{
    sector : any | null
    setSector : (sector : any|null) => void
}>((set) => ({
   sector: null,
   setSector : (sector : any|null) => {
       set({sector : sector})
   }
}));