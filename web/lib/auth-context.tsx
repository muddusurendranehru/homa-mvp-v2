'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  planTier?: string;
  packageName?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [legacyUser, setLegacyUser] = useState<User | null>(null);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setLegacyUser(JSON.parse(storedUser) as User);
      } catch {
        /* ignore corrupt JSON */
      }
    }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    const isAuthRoute = pathname === '/auth';
    if (token && isAuthRoute) {
      router.push('/dashboard');
    }
  }, [token, pathname, storageReady, router]);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setLegacyUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    sessionStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    setLegacyUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    signOut({ redirectUrl: '/auth' });
  };

  const user: User | null = useMemo(() => {
    if (clerkUser) {
      return {
        id: clerkUser.id,
        name:
          clerkUser.fullName ||
          [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') ||
          'User',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
      };
    }
    return legacyUser;
  }, [clerkUser, legacyUser]);

  const isAuthenticated = !!clerkUser || !!token;
  const loading = !isLoaded || !storageReady;

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
