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

