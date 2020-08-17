module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: { //配置快捷路径
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },

  publicPath: './'
}