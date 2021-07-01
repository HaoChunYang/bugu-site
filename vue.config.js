module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9212',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
