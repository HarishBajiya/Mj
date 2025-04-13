module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/',
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    }
  }
}
