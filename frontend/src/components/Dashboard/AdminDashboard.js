import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import UserTable from './UserTable';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    if (user && user.role !== 'admin') {
      toast.error('Access denied. Admin only.');
      navigate('/profile');
    }
    setLoading(false);
  }, [user, navigate]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null; // Will redirect in useEffect
  }

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.welcome}>Welcome, {user.fullName || 'Admin'}!</h1>
          <p style={styles.subtitle}>Admin Dashboard - User Management System</p>
        </div>
        
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>4</h3>
            <p style={styles.statLabel}>Total Users</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>1</h3>
            <p style={styles.statLabel}>Admins</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>3</h3>
            <p style={styles.statLabel}>Active Users</p>
          </div>
        </div>
        
        {/* User Table Component */}
        <UserTable />
      </div>
    </div>
  );
};

// In AdminDashboard.js, update the styles:

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  content: {
    padding: '30px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '40px',
    textAlign: 'center'
  },
  welcome: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '0 0 10px 0',
    background: 'linear-gradient(45deg, #3498db, #2c3e50)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
  },
  subtitle: {
    fontSize: '18px',
    color: '#7f8c8d',
    margin: 0,
    fontWeight: '500'
  },
  stats: {
    display: 'flex',
    gap: '25px',
    marginBottom: '40px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  statCard: {
    flex: '1',
    minWidth: '200px',
    maxWidth: '250px',
    background: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
    }
  },
  statNumber: {
    fontSize: '48px',
    fontWeight: '800',
    color: '#3498db',
    margin: '0 0 10px 0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
  },
  statLabel: {
    fontSize: '16px',
    color: '#7f8c8d',
    margin: 0,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: '1px'
  }
};

export default AdminDashboard;