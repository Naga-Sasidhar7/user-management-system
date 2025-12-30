import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState('');
    
    const { register } = useAuth();
    const navigate = useNavigate();

    // Check password strength
    const checkPasswordStrength = (password) => {
        if (!password) return '';
        
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        if (strength === 0) return '';
        if (strength <= 2) return 'weak';
        if (strength === 3) return 'medium';
        return 'strong';
    };

    const handlePasswordChange = (password) => {
        setFormData({...formData, password});
        setPasswordStrength(checkPasswordStrength(password));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        else if (formData.fullName.trim().length < 2) newErrors.fullName = 'Name must be at least 2 characters';
        
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        
        try {
            await register({
                fullName: formData.fullName.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password
            });
            
            // Redirect to login after successful registration
            navigate('/login', { 
                state: { 
                    message: 'Registration successful! Please login with your credentials.' 
                } 
            });
        } catch (error) {
            setErrors({ server: error.message || 'Registration failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const getStrengthText = () => {
        switch(passwordStrength) {
            case 'weak': return 'Weak password';
            case 'medium': return 'Medium password';
            case 'strong': return 'Strong password';
            default: return '';
        }
    };

    const getStrengthClass = () => {
        switch(passwordStrength) {
            case 'weak': return 'strength-weak';
            case 'medium': return 'strength-medium';
            case 'strong': return 'strength-strong';
            default: return '';
        }
    };

    return (
        <div className="register-container">
            <div className="register-header">
                <h1>Create Account</h1>
                <p>Join our user management system</p>
            </div>
            
            <form className="register-form" onSubmit={handleSubmit}>
                {errors.server && (
                    <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i> {errors.server}
                    </div>
                )}
                
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        placeholder="Enter your full name"
                        disabled={loading}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Enter your email"
                        disabled={loading}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        placeholder="Create a password (min. 6 characters)"
                        disabled={loading}
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                    {passwordStrength && (
                        <div className={`password-strength ${getStrengthClass()}`}>
                            Password strength: {getStrengthText()}
                        </div>
                    )}
                </div>
                
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        placeholder="Confirm your password"
                        disabled={loading}
                    />
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
                
                <button type="submit" className="btn-register" disabled={loading}>
                    {loading ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i> Creating Account...
                        </>
                    ) : (
                        'Sign Up'
                    )}
                </button>
                
                <div className="login-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;