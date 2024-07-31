import React, { useEffect, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useChangePasswordStore } from '../zustand/isChangePasswod.store';

function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  requireAuth: boolean = true
): ComponentType<P> {
  const WithAuth: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const { isChangePassword } = useChangePasswordStore();
    
    useEffect(() => {
      const checkAuth = () => {
        const token = Cookies.get('token');
        const isAuthenticated = !!token;
        
        if (requireAuth && !isAuthenticated || !isChangePassword) {
          // Nếu yêu cầu xác thực nhưng chưa đăng nhập, chuyển hướng đến trang login
          navigate('/login');
        } else if (!requireAuth && isAuthenticated) {
          // Nếu đã đăng nhập và cố gắng truy cập trang login, chuyển hướng đến trang chủ
          navigate('/');
        }
      };

      checkAuth();
    }, [isChangePassword, navigate]);

    // Render component gốc với tất cả props
    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
}

export default withAuth;