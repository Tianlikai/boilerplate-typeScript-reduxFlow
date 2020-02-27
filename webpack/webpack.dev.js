const path = require("path");
const webpack = require("webpack");
const environment = require("./env");
const { px2remLoader } = require("./loader");

module.exports = {
  devtool: "inline-cheap-module-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: path.join(__dirname, "../src"),
        use: ["style-loader", "css-loader", px2remLoader],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          px2remLoader,
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    host: environment.HOST,
    port: environment.PORT,
    open: true,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
