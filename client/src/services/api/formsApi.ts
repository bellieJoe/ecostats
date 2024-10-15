import axios from "axios";

const apiUrl : string = import.meta.env.VITE_API_URL;

export const formUpdate = async (model : any, formName : string, sectorName : string) : Promise<any> => {
    const res = await axios.put(`${apiUrl}/${sectorName}/${formName}`, {
        model : model
    });
    return res;
}

export const formDelete = async (id : any, formName : string, sectorName : string) : Promise<any> => {
    const res = await axios.delete(`${apiUrl}/${sectorName}/${formName}/${id}`);
    return res;
}

export const formCreate = async (model : any, formName : string, sectorName : string) : Promise<any> => {
    const res = await axios.post(`${apiUrl}/${sectorName}/${formName}`, {
        model : model
    });
    return res;
}

export const formGet = async (formName : string, sectorName : string, limit : number, page : number) : Promise<any> => {
    const res = await axios.get(`${apiUrl}/${sectorName}/${formName}`, {
        params : {
            page, limit
        }
    });
    return res;
}
