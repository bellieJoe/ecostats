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

export const useUpdateReportConfigStore = create<{
    reportData : any
    setReportData : (reportData : any|null) => void
}>((set) => ({
    reportData: {},
   setReportData : (reportData : any|null) => {
       set({reportData : reportData})
   }
}));