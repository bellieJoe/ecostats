import { create } from "zustand";
import { FormEnum, Sector } from "../types/forms/formNameEnum";

interface PreviewReportState {
    report : any,
    colDefs : any[],
    formName : FormEnum | null,
    sector : Sector | null
    setReport : (report) => void,
    setStore : (colDefs, formName : FormEnum, sector : Sector, report) => void,
    clear : () => void
}

export const usePreviewReportStore = create<PreviewReportState>((set) => ({
    report : null,
    colDefs : [],
    formName : null,
    sector : null,

    setReport : (report) => 
    {
        set({
            report: report
        })
    },
    setStore : (colDefs, formName , sector , report) => {
        set({
            colDefs,
            formName,
            sector,
            report
        })
    },
    clear : () => {
        set({
            report: null,
            // colDefs : [],
            formName : null,
            sector : null
        })
    }
}));
