const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config");

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    hot: true,
    open: true,
    port: 3000,
  },
});
