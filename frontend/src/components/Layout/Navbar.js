import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <Link to={user.role === 'admin' ? '/admin' : '/profile'} style={styles.brandLink}>
            User Management System
          </Link>
        </div>
        
        <div style={styles.navItems}>
          <span style={styles.welcomeText}>
            Welcome, {user.fullName || user.email}
          </span>
          <Link to="/profile" style={styles.navLink}>
            Profile
          </Link>
          {user.role === 'admin' && (
            <Link to="/admin" style={styles.navLink}>
              Admin Dashboard
            </Link>
          )}
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to logout?')) {
                window.location.href = '/login';
                localStorage.clear();
              }
            }}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '15px 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  brand: {
    fontSize: '20px',
    fontWeight: '700'
  },
  brandLink: {
    color: 'white',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  navItems: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  welcomeText: {
    fontSize: '14px',
    color: '#ecf0f1',
    fontWeight: '500',
    marginRight: '10px'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    backgroundColor: '#3498db',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#2980b9',
      textDecoration: 'none'
    }
  },
  logoutButton: {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    backgroundColor: '#e74c3c',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#c0392b'
    }
  }
};

export default Navbar;
