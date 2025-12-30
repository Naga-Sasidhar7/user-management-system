import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  if (user) {
    if (user.role === 'admin') {
      window.location.href = '/admin';
      return null;
    } else {
      window.location.href = '/profile';
      return null;
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>User Management System</h1>
        <p style={styles.subtitle}>
          A complete solution for managing users with role-based access control
        </p>
        <div style={styles.buttonGroup}>
          <Link to="/login" style={styles.primaryButton}>
            Login
          </Link>
          <Link to="/register" style={styles.secondaryButton}>
            Register
          </Link>
        </div>
      </div>
      
      <div style={styles.features}>
        <div style={styles.feature}>
          <h3>👑 Admin Dashboard</h3>
          <p>Manage users, roles, and permissions with full CRUD operations</p>
        </div>
        <div style={styles.feature}>
          <h3>👤 User Profiles</h3>
          <p>Edit profile information and change password securely</p>
        </div>
        <div style={styles.feature}>
          <h3>🔒 Secure Authentication</h3>
          <p>Role-based access control with protected routes</p>
        </div>
        <div style={styles.feature}>
          <h3>📱 Responsive Design</h3>
          <p>Works perfectly on desktop, tablet, and mobile devices</p>
        </div>
      </div>
      
      <div style={styles.demoInfo}>
        <h3 style={styles.demoTitle}>Demo Accounts</h3>
        <div style={styles.demoAccounts}>
          <div style={styles.demoAccount}>
            <h4>Admin Account</h4>
            <p>Email: admin@example.com</p>
            <p>Password: admin123</p>
            <p>Access: Full admin dashboard</p>
          </div>
          <div style={styles.demoAccount}>
            <h4>User Account</h4>
            <p>Email: user@example.com</p>
            <p>Password: user123</p>
            <p>Access: User profile only</p>
          </div>
          <div style={styles.demoAccount}>
            <h4>Any Account</h4>
            <p>Email: any@email.com</p>
            <p>Password: anything</p>
            <p>Access: Auto-register as user</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  hero: {
    textAlign: 'center',
    padding: '80px 20px 60px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  title: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  },
  subtitle: {
    fontSize: '20px',
    opacity: '0.95',
    marginBottom: '40px',
    lineHeight: '1.6',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '60px'
  },
  primaryButton: {
    padding: '15px 40px',
    background: 'white',
    color: '#764ba2',
    textDecoration: 'none',
    borderRadius: '50px',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
    }
  },
  secondaryButton: {
    padding: '15px 40px',
    background: 'transparent',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '50px',
    fontSize: '18px',
    fontWeight: '600',
    border: '2px solid white',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    ':hover': {
      background: 'white',
      color: '#764ba2',
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
    }
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    padding: '60px 20px',
    flexWrap: 'wrap',
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)'
  },
  feature: {
    background: 'rgba(255,255,255,0.15)',
    padding: '30px',
    borderRadius: '15px',
    textAlign: 'center',
    minWidth: '250px',
    maxWidth: '280px',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)'
    }
  },
  demoInfo: {
    padding: '60px 20px',
    textAlign: 'center'
  },
  demoTitle: {
    fontSize: '32px',
    marginBottom: '40px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
  },
  demoAccounts: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  demoAccount: {
    background: 'rgba(255,255,255,0.15)',
    padding: '25px',
    borderRadius: '12px',
    minWidth: '280px',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'all 0.3s ease',
    ':hover': {
      background: 'rgba(255,255,255,0.2)',
      transform: 'translateY(-5px)'
    }
  }
};

export default HomePage;
