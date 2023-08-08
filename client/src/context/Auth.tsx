import React, { createContext, useState, useEffect } from "react";

export type UserType = {
  email: string;
  username?: string;
  source: string;
  plan?: any;
  isAdmin: boolean;
  adminType: string;
  address: string;
  telephone: string;
  name: string;
  ip: string;
  id: string;
};

interface AuthProps {
  user: UserType | undefined;
  isAuthenticated: boolean;
  handleUserName: (val: UserType) => void;
}

export const AuthContext = createContext<AuthProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | undefined>(() => {
    const localUserData = localStorage.getItem("user");
    return localUserData ? JSON.parse(localUserData) : undefined;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("user") ? true : false;
  });

  useEffect(() => {
    setIsAuthenticated(user ? true : false);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleUserName = (val: UserType) => {
    if (val) {
      setUser(val);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, handleUserName }}>
      {children}
    </AuthContext.Provider>
  );
};
