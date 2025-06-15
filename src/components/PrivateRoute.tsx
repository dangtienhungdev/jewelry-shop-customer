import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
	children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		// Lưu lại đường dẫn hiện tại để redirect sau khi login
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <>{children}</>;
};

export default PrivateRoute;
