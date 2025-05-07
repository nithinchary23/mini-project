import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest('GET', '/api/auth/me');
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        // User is not authenticated, that's okay
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  const login = (userData: User) => {
    setUser(userData);
  };
  
  const logout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout');
      setUser(null);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
