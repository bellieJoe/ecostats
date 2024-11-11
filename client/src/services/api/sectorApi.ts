import axios from "axios";  
import _ from "lodash";

const apiUrl : string = import.meta.env.VITE_API_URL;

export const sectorUpdate = async (model : any) : Promise<any> => {
    const res = await axios.put(`${apiUrl}/sectors`, {
        model : model
    });
    return res;
}

export const sectorDelete = async (id : any) : Promise<any> => {
    const res = await axios.delete(`${apiUrl}/sectors/${id}`);
    return res;
}

export const sectorCreate = async (model : any) : Promise<any> => {
    const res = await axios.post(`${apiUrl}/sectors`, {
        model : model
    });
    return res;
}

export const sectorSaveMany = async (models : any) : Promise<any> => {
    const res = await axios.post(`${apiUrl}/sectors/save-many`, {
        models : models
    });
    return res;
}

export const sectorGet = async ( limit : number, page : number) : Promise<any> => {
    const res = await axios.get(`${apiUrl}/sectors`, {
        params : {
            page, limit
        }
    });
    return res;
}

export const sectorGetByQuery = async ( query : any, populate : any) : Promise<any> => {
    console.log(JSON.stringify(populate))
    const res = await axios.get(`${apiUrl}/sectors/by-query`, {
        params : {
            query : JSON.stringify(query), 
            populate : JSON.stringify(populate)
        }
    });
    return res;
}


// tensor prediction


