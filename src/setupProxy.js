const { createProxyMiddleware } = require('http-proxy-middleware');

const url = {
  development: 'localhost:5500',
  production: 'https://rateflix-server.herokuapp.com'
};

module.exports = function(app) {
  console.log('createProxyMiddleware - NODE_ENV:', proces.env.NODE_ENV);
  app.use(
    '/api',
    createProxyMiddleware({
      target: url[process.env.NODE_ENV],
      changeOrigin: true,
    })
  );
  app.use(
    '/auth',
    createProxyMiddleware({
      target: url[process.env.NODE_ENV],
      changeOrigin: true,
    })
  );
};