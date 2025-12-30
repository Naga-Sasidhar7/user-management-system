import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', { email, password });
        
        if (!email.trim() || !password.trim()) {
            alert('Please enter both email and password');
            return;
        }
        
        setLoading(true);
        
        try {
            console.log('Calling login function...');
            // Call the login function from AuthContext
            const user = await login(email, password);
            console.log('Login successful, user:', user);
            
            if (user) {
                console.log('User authenticated, redirecting...');
                console.log('User role:', user.role);
                
                // Wait a moment for state to update
                setTimeout(() => {
                    // Use window.location for guaranteed redirect
                    if (user.role === 'admin') {
                        console.log('Redirecting to /admin');
                        window.location.href = '/admin';
                    } else {
                        console.log('Redirecting to /profile');
                        window.location.href = '/profile';
                    }
                }, 100);
            } else {
                console.log('Login returned no user');
                alert('Login failed. No user returned.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const autoFillCredentials = (email, password) => {
        console.log('Auto-filling:', email);
        setEmail(email);
        setPassword(password);
    };

    const copyCredentials = (email, password) => {
        const textToCopy = `Email: ${email}\nPassword: ${password}`;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert(`Copied ${email} credentials`);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert(`Copied ${email} credentials`);
        });
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Login</h1>
                <p>Access your account to continue</p>
            </div>
            
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-container">
                        <i className="fas fa-envelope"></i>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            disabled={loading}
                        />
                    </div>
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-container">
                        <i className="fas fa-lock"></i>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            disabled={loading}
                        />
                    </div>
                </div>
                
                <button type="submit" className="btn-login" disabled={loading}>
                    {loading ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i> Logging in...
                        </>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
            
            <div className="demo-section">
                <div className="demo-title">
                    <i className="fas fa-users"></i>
                    Demo Accounts:
                </div>
                
                <div 
                    className="demo-account" 
                    onClick={() => !loading && autoFillCredentials('admin@example.com', 'admin123')}
                    style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                >
                    <div className="account-type">Admin Account</div>
                    <div className="account-credentials">admin@example.com / admin123</div>
                    <button 
                        className="copy-btn" 
                        onClick={(e) => {
                            e.stopPropagation();
                            copyCredentials('admin@example.com', 'admin123');
                        }}
                        disabled={loading}
                    >
                        <i className="fas fa-copy"></i> Copy
                    </button>
                </div>
                
                <div 
                    className="demo-account" 
                    onClick={() => !loading && autoFillCredentials('user@example.com', 'user123')}
                    style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                >
                    <div className="account-type">User Account</div>
                    <div className="account-credentials">user@example.com / user123</div>
                    <button 
                        className="copy-btn" 
                        onClick={(e) => {
                            e.stopPropagation();
                            copyCredentials('user@example.com', 'user123');
                        }}
                        disabled={loading}
                    >
                        <i className="fas fa-copy"></i> Copy
                    </button>
                </div>
                
                <div 
                    className="any-demo"
                    onClick={() => !loading && autoFillCredentials('demo@example.com', 'demo123')}
                    style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                >
                    <i className="fas fa-info-circle"></i> Any email/password combination works for demo
                </div>
            </div>
            
            <div className="register-link">
                Don't have an account? <a href="/register">Register here</a>
            </div>
            
            <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '5px', fontSize: '12px' }}>
                <strong>Debug Info:</strong> Check browser console for login details
            </div>
        </div>
    );
};

export default Login;