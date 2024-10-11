import axios from "axios";
import { Role } from "../../types/Role";

const apiUrl : string = import.meta.env.VITE_API_URL;

export const getRoles = async () : Promise<Role[]> => {
    const res = await axios.get(`${apiUrl}/roles`);
    return res.data;
}