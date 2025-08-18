import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthResponse, UserProfile } from '../models/auth';
import { register, login } from '../api/auth';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {}, []);

  const handleLogin = async (username: string, password: string) => {
    const response = await login({ username, password });
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setUser(response.user);
  };

  const handleRegister = async (userData: any) => {
    const response = await register(userData);
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setUser(response.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};