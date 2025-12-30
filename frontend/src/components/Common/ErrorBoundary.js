import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.errorCard}>
            <h1 style={styles.title}>⚠️ Something went wrong</h1>
            <p style={styles.message}>
              We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            
            <div style={styles.buttonGroup}>
              <button 
                onClick={this.handleRefresh}
                style={styles.primaryButton}
              >
                Refresh Page
              </button>
              <button 
                onClick={this.handleGoHome}
                style={styles.secondaryButton}
              >
                Go to Homepage
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div style={styles.errorDetails}>
                <h3>Error Details (Development Only):</h3>
                <pre style={styles.errorStack}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
            
            <p style={styles.helpText}>
              If the problem persists, please contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  errorCard: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#e74c3c',
    marginBottom: '15px'
  },
  message: {
    fontSize: '16px',
    color: '#7f8c8d',
    marginBottom: '30px',
    lineHeight: '1.6'
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  primaryButton: {
    padding: '12px 24px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '140px',
    ':hover': {
      background: '#2980b9',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)'
    }
  },
  secondaryButton: {
    padding: '12px 24px',
    background: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '140px',
    ':hover': {
      background: '#27ae60',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(46, 204, 113, 0.3)'
    }
  },
  errorDetails: {
    marginTop: '30px',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'left',
    border: '1px solid #e9ecef'
  },
  errorStack: {
    fontSize: '12px',
    color: '#e74c3c',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    maxHeight: '200px',
    overflow: 'auto',
    padding: '10px',
    background: '#fdf2f2',
    borderRadius: '4px'
  },
  helpText: {
    fontSize: '14px',
    color: '#95a5a6',
    marginTop: '20px',
    fontStyle: 'italic'
  }
};

export default ErrorBoundary;
