import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://exisquanly.com:9000',
      changeOrigin: true,
    })
  );
}