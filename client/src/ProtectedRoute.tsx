import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('token');

    if (!isLoggedIn) {
        return <Navigate to="/auth/login" />;
    }

    return children;
}

export default ProtectedRoute;