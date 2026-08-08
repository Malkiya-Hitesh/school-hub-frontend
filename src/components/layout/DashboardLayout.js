import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div
      style={{
        padding: '24px 16px',
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
};

export default DashboardLayout;
