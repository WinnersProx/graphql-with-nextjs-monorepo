import React, { useContext, useState } from 'react';
import { User } from '../../common/types';
import axios from 'axios';
import { getAuthToken } from './utils';

axios.defaults.headers.common['accept'] = "application/json";


type UserContextProps = {
  user: User | null | undefined;
  authenticateUser?: CallableFunction
};

const UserContext = React.createContext<UserContextProps>({
  user: null
});



export const useAuth = () => {
  const { user } = useContext(UserContext);
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(!!getAuthToken())


  const authenticateUser = async () => {
    const data = await axios.post("http://localhost:5001/api/auth/login", {
        email: "bihames4vainqueur@gmail.com"
    }, {
      withCredentials: true,
    }).catch(err => { console.error(err) })

    if(!data?.data) return;

    localStorage.setItem('userjt', data.data.access_token);

    setIsAuthenticated(true);
  }

  

  return { user, authenticateUser, isAuthenticated };
};

export default UserContext;
