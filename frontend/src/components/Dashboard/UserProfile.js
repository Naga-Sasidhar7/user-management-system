import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './UserProfile.css'; 

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      toast.success('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      toast.success('Logged out successfully');
      navigate('/login');
    }
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">Manage your account information</p>
        </div>

        <div className="profile-grid">
          
          <div className="profile-left">
            <div className="profile-card">
              <div className="card-header">
                <h2 className="card-title">Profile Information</h2>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="edit-btn"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleProfileSubmit} className="profile-form">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleProfileChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleProfileChange}
                      className="form-input"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button
                      type="submit"
                      className="save-btn"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-row">
                    <span className="info-label">Full Name:</span>
                    <span className="info-value">{user.fullName || 'Not set'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user.email || 'Not set'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Role:</span>
                    <span className={`role-badge ${user.role === 'admin' ? 'admin' : 'user'}`}>
                      {user.role?.toUpperCase() || 'USER'}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span className={`status-badge ${user.status === 'active' ? 'active' : 'inactive'}`}>
                      {user.status?.toUpperCase() || 'ACTIVE'}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">User ID:</span>
                    <span className="info-value">{user.id || 'N/A'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

         
          <div className="profile-right">
            <div className="profile-card">
              <h2 className="card-title">Change Password</h2>
              <form onSubmit={handlePasswordSubmit} className="profile-form">
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="form-input"
                    placeholder="Enter current password"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="form-input"
                    placeholder="Enter new password (min. 6 chars)"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="form-input"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="password-btn"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Change Password'}
                </button>
              </form>
            </div>

            <div className="profile-card">
              <h2 className="card-title">Account Actions</h2>
              <button
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
              <p className="help-text">
                Click logout to securely end your session
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
