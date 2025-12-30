import React from 'react';

const LoadingSpinner = ({ size = 40, color = '#3498db' }) => {
  return (
    <div style={styles.container}>
      <div style={{
        ...styles.spinner,
        width: size,
        height: size,
        border: `4px solid #f3f3f3`,
        borderTop: `4px solid ${color}`,
        borderRadius: '50%'
      }}></div>
      <p style={styles.text}>Loading...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px'
  },
  spinner: {
    animation: 'spin 1s linear infinite',
    marginBottom: '15px'
  },
  text: {
    color: '#7f8c8d',
    fontSize: '16px'
  }
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default LoadingSpinner;
