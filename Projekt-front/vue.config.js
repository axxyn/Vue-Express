const { defineConfig } = require('@vue/cli-service')
require('dotenv').config()

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: process.env.PROXY,
  },
  lintOnSave: false,
})