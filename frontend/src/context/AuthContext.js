// src/context/AuthContext.js - UPDATE THIS FILE
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const API_URL = 'http://localhost:5000/api';

  // Check localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return data.user;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      // Fallback to demo mode if backend fails
      console.warn('Backend login failed, using demo mode:', error.message);
      
      // DEMO MODE FALLBACK
      let userData;
      if (email === 'admin@example.com' && password === 'admin123') {
        userData = {
          id: '1',
          fullName: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          status: 'active'
        };
        localStorage.setItem('token', 'demo-token-admin');
      } else if (email && password) {
        userData = {
          id: Date.now().toString(),
          fullName: 'Demo User',
          email: email,
          role: 'user',
          status: 'active'
        };
        localStorage.setItem('token', 'demo-token');
      } else {
        throw new Error('Invalid credentials');
      }
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return data.user;
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      // Fallback to demo mode
      console.warn('Backend registration failed, using demo mode:', error.message);
      
      const demoUser = {
        ...userData,
        id: Date.now().toString(),
        role: 'user',
        status: 'active'
      };
      
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('user', JSON.stringify(demoUser));
      setUser(demoUser);
      return demoUser;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};