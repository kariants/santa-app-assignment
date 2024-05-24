import { createContext, useContext, useState } from 'react';

import { User } from '../types/User';
import { LoginFormInputs } from '../components/LoginForm';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/services/Auth/AuthApi';

interface AuthContextProps {
  token: string;
  user: User | null;
  loginAction: (data: any) => Promise<void>;
  logOut: () => void; 
  navigateTo: (path: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children, navigateTo }: { children: React.ReactNode, navigateTo: (path: string) => void }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("santa-app") || "");

  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: login,
    onSuccess: (res: any) => {
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("santa-app", res.token);
        navigateTo("/");
        return;
      }
    },
    onError: (e: any) => {
      console.log("error: todo handle errors");
    }
  });

  const loginAction = async (credentials: LoginFormInputs) => {
    await loginMutation(credentials);
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("santa-app");
    navigateTo("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, navigateTo }}>
      {children}
    </AuthContext.Provider>
  ); 
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};