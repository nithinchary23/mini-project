import { useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { apiRequest } from '@/lib/queryClient';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both username and password',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await apiRequest('POST', '/api/auth/login', { username, password });
      const data = await response.json();
      
      login(data.user);
      setLocation('/');
      
      toast({
        title: 'Welcome',
        description: `Successfully logged in as ${data.user.name}`,
      });
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="font-serif font-bold text-2xl text-primary-900 mb-2">Xenotransplant Monitoring System</h1>
          <p className="text-neutral-600">Sign in to access your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-neutral-700 mb-1">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
        
        <p className="text-center text-sm text-neutral-600">
          For demonstration purposes, use:<br />
          Username: <span className="font-medium">doctor</span> | Password: <span className="font-medium">password</span>
        </p>
      </div>
    </div>
  );
}
