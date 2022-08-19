import axios from 'axios'
import { useAuth } from './useAuth'

export const useRefreshToken = () => { 

    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get()
    }
}