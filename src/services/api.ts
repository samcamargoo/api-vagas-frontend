import { useAuth } from './../hooks/useAuth';
import  axios  from 'axios';



export const api = axios.create({
    baseURL: 'https://icpa-production.up.railway.app/api/v1'
    
});


export function setToken(token: string) {
    api.defaults.headers.common['Authorization'] = '';
    delete axios.defaults.headers.common['Authorization'];

    
    if(token) {
        api.defaults.headers.common['Authorization'] = 'Bearer ' +token;    
    }
}
