import axios from "axios";

const apiUrl : string = import.meta.env.VITE_API_URL;

export const createProgram = async (userId : string, name : string) : Promise<any> => {
    const res = await axios.post(`${apiUrl}/programs/create`, {userId, name});
    return res;
}

export const searchProgramByName = async (name : string) : Promise<any> => {
    const res = await axios.get(`${apiUrl}/programs/search/${name}`);
    return res;
}

export const countPrograms = async () : Promise<any> => {
    const res = await axios.get(`${apiUrl}/programs/count`);
    return res;
}

export const getAllPrograms = async (page:number, limit:number, name?:string|null) : Promise<any> => {
    let query = `page=${page}&limit=${limit}`;
    if(name){
        query += `&name=${name}`;
    }
    const res = await axios.get(`${apiUrl}/programs?${query}`);
    return res;
}

export const getProgramHeads = async (programId : string) : Promise<any> => {
    const res = await axios.get(`${apiUrl}/programs/heads/${programId}`);
    return res;
}

export const deleteProgram = async (programId : string) : Promise<any> => {
    const res = await axios.delete(`${apiUrl}/programs/delete/${programId}`);
    return res;
}

export const removeProgramHead = async (programId:string, userId:string) : Promise<any> => {
    const res = await axios.delete(`${apiUrl}/programs/remove-head`, {
        params : { programId, userId }
    });
    return res;
}
    

export const getProgramById = async (programId:string) : Promise<any> => {
    const res = await axios.get(`${apiUrl}/programs/get-by-id/${programId}`);
    return res;
}
    
export const updateProgram = async (id :string, name : string) : Promise<any> => {
    const res = await axios.put(`${apiUrl}/programs/update`, {id, name});
    return res;
}
    
