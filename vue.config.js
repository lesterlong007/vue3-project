const { defineConfig } = require("@vue/cli-service");

const isDev = process.env.NODE_ENV === "development";

const fix = (num, length) => {
  return ("" + num).length < length
    ? (new Array(length + 1).join("0") + num).slice(-length)
    : "" + num;
};
const date = new Date();
const time = `${date.getFullYear()}${fix(date.getMonth() + 1, 2)}${fix(
  date.getDate(),
  2
)}${fix(date.getHours(), 2)}${fix(date.getMinutes(), 2)}${fix(
  date.getSeconds(),
  2
)}`;

module.exports = defineConfig({
  publicPath: isDev
    ? "/"
    : process.env.CDN_PATH + process.env.PROJECT_NAME + "/",
  transpileDependencies: false,
  devServer: {
    proxy: {
      "/tenacity-webapp/api": {
        target: "https://dev.tenacity.com.cn",
        changeOrigin: true,
      },
    },
  },
  css: {
    extract: {
      filename: time + "/css/[name].[chunkhash:8].css",
      chunkFilename: time + "/css/[id].[chunkhash:8].css",
    },
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: {
    output: {
      filename: time + "/js/[name].[chunkhash:8].js",
      chunkFilename: time + "/js/[name].[chunkhash:8].js",
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "出单宝";
      return args;
    });
    config.plugin("define").tap((args) => {
      args[0]["process.env"]["PROJECT_NAME"] = JSON.stringify(
        process.env.PROJECT_NAME
      );
      return args;
    });
  },
});
