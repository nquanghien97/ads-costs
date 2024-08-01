import axios from 'axios';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Hàm xử lý đăng xuất
export const handleLogout = () => {
  Cookies.remove('token');
  // Chuyển hướng đến trang đăng nhập
  window.location.href = '/login';
};

// Interceptor cho request
api.interceptors.request.use(
  (config) => {
    config.headers['x-api-key'] = import.meta.env.VITE_X_API_KEY;
    config.headers['X-Request-Id'] = uuidv4();
    
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      handleLogout();
      return Promise.reject(new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'));
    }
    return Promise.reject(error);
  }
);

export default api;