import { IS_SERVER } from "./init-apollo";


export const getAuthToken = () => {
    if(IS_SERVER) return null;
    
    return localStorage.getItem('userjt')
}