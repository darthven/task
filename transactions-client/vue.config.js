module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api/v1/*': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
}
