import axios from "axios";

const apiUrl : string = import.meta.env.VITE_API_URL;

export const createUnit = async (userId : string, name : string, programId : string) : Promise<any> => {
    const res = await axios.post(`${apiUrl}/units/create`, {userId, name, programId});
    return res;
}

export const searchUnitByName = async (name : string) : Promise<any> => {
    const res = await axios.get(`${apiUrl}/units/search/${name}`);
    return res;
}

export const countUnits = async () : Promise<any> => {
    const res = await axios.get(`${apiUrl}/units/count`);
    return res;
}

export const getByProgram = async (page:number, limit:number, programId : string|null, name?:string|null) : Promise<any> => {
    let query = `page=${page}&limit=${limit}`;
    if(name){
        query += `&name=${name}`;
    }
    if(programId){
        query += `&programId=${programId}`;
    }
    const res = await axios.get(`${apiUrl}/units/all?${query}`);
    return res;
}


export const deleteUnit = async (unitId : string) : Promise<any> => {
    const res = await axios.delete(`${apiUrl}/units/delete/${unitId}`);
    return res;
}