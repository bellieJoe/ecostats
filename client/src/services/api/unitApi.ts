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
