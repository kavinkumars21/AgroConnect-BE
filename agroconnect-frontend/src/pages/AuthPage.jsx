import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Leaf, User, Briefcase, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const roleParam = searchParams.get('role') || null;
  const redirect = searchParams.get('redirect') || '/';
  
  const [activeTab, setActiveTab] = useState(mode === 'register' ? 'register' : 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(roleParam || 'consumer');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already authenticated, redirect
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [isAuthenticated, navigate, redirect]);
  
  useEffect(() => {
    // Update active tab when URL changes
    setActiveTab(mode === 'register' ? 'register' : 'login');
  }, [mode]);
  
  useEffect(() => {
    // Update role when URL changes
    if (roleParam) {
      setRole(roleParam);
    }
  }, [roleParam]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    const newParams = new URLSearchParams(searchParams);
    newParams.set('mode', tab);
    navigate({ search: newParams.toString() });
  };
  
  const validateForm = () => {
    setError('');
    
    if (activeTab === 'register') {
      if (!name.trim()) {
        setError('Name is required');
        return false;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
    }
    
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    if (!password) {
      setError('Password is required');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      if (activeTab === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password, role);
      }
      navigate(redirect);
    } catch (err) {
      console.error('Auth error:', err);
      setError(activeTab === 'login' 
        ? 'Invalid email or password' 
        : 'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const roleOptions = [
    { 
      value: 'farmer', 
      label: 'Farmer', 
      icon: <Leaf className="w-5 h-5 mr-2 text-primary-600" /> 
    },
    { 
      value: 'consumer', 
      label: 'Consumer', 
      icon: <User className="w-5 h-5 mr-2 text-secondary-600" /> 
    },
    { 
      value: 'business', 
      label: 'Business', 
      icon: <Briefcase className="w-5 h-5 mr-2 text-accent-600" /> 
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {activeTab === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {activeTab === 'login' 
              ? "Don't have an account yet? " 
              : "Already have an account? "}
            <button 
              onClick={() => handleTabChange(activeTab === 'login' ? 'register' : 'login')}
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              {activeTab === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
        
        <Card className="p-8">
          {/* Login/Register tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`pb-2 px-1 ${
                activeTab === 'login'
                  ? 'border-b-2 border-primary-500 text-primary-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              } flex-1 text-center focus:outline-none transition-colors`}
              onClick={() => handleTabChange('login')}
            >
              Sign In
            </button>
            <button
              className={`pb-2 px-1 ${
                activeTab === 'register'
                  ? 'border-b-2 border-primary-500 text-primary-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              } flex-1 text-center focus:outline-none transition-colors`}
              onClick={() => handleTabChange('register')}
            >
              Sign Up
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === 'register' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            {activeTab === 'register' && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {roleOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setRole(option.value)}
                        className={`
                          flex items-center justify-center py-2 px-2 border ${
                            role === option.value
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                          } rounded-md focus:outline-none transition-colors text-sm
                        `}
                      >
                        {option.icon}
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                className="w-full flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : null}
                {activeTab === 'login' ? 'Sign In' : 'Sign Up'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;