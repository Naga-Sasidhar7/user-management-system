import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // CSS is included automatically
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/Common/ErrorBoundary';
import PrivateRoute from './components/Layout/PrivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import UserProfile from './components/Dashboard/UserProfile';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  fontSize: '14px',
                  padding: '16px',
                  borderRadius: '8px',
                  maxWidth: '400px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                },
                success: {
                  duration: 3000,
                  style: {
                    background: '#28a745',
                    color: '#fff',
                    borderLeft: '4px solid #1e7e34'
                  },
                  icon: '✅'
                },
                error: {
                  duration: 5000,
                  style: {
                    background: '#dc3545',
                    color: '#fff',
                    borderLeft: '4px solid #bd2130'
                  },
                  icon: '❌'
                },
                loading: {
                  style: {
                    background: '#17a2b8',
                    color: '#fff',
                    borderLeft: '4px solid #138496'
                  },
                  icon: '⏳'
                }
              }}
            />
            
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/admin" element={
                <PrivateRoute adminOnly={true}>
                  <AdminDashboard />
                </PrivateRoute>
              } />
              
              <Route path="/profile" element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              } />
              
              <Route path="*" element={
                <div style={styles.notFound}>
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                  <a href="/" style={styles.homeLink}>Return to Home</a>
                </div>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

const styles = {
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  homeLink: {
    marginTop: '20px',
    padding: '12px 24px',
    background: 'white',
    color: '#764ba2',
    textDecoration: 'none',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  }
};

export default App;