"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole } from "./mock-data";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const DEFAULT_USERS: Record<UserRole, AuthUser> = {
  SUPER_ADMIN: {
    id: "usr-super",
    name: "Nexora Super Admin",
    email: "admin@nexora.com",
    role: "SUPER_ADMIN",
  },
  CATALOG_MANAGER: {
    id: "usr-cat",
    name: "Rakib Hassan",
    email: "catalog@nexora.com",
    role: "CATALOG_MANAGER",
  },
  SALES_STAFF: {
    id: "usr-sales",
    name: "Tanjim Ahmed",
    email: "sales@nexora.com",
    role: "SALES_STAFF",
  },
  CUSTOMER: {
    id: "usr-cust",
    name: "Ayesha Rahman",
    email: "ayesha@gmail.com",
    role: "CUSTOMER",
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("SUPER_ADMIN");
  const [user, setUser] = useState<AuthUser | null>(DEFAULT_USERS.SUPER_ADMIN);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("demo_role") as UserRole | null;
      if (savedRole && DEFAULT_USERS[savedRole]) {
        setRole(savedRole);
        setUser(DEFAULT_USERS[savedRole]);
      }
    }
  }, []);

  const loginAs = (newRole: UserRole) => {
    setRole(newRole);
    setUser(DEFAULT_USERS[newRole]);
    if (typeof window !== "undefined") {
      localStorage.setItem("demo_role", newRole);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("demo_role");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        loginAs,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: DEFAULT_USERS.SUPER_ADMIN,
      role: "SUPER_ADMIN" as UserRole,
      isAuthenticated: true,
      loginAs: () => {},
      logout: () => {},
    };
  }
  return context;
}
