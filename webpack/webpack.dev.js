const path = require("path");
const webpack = require("webpack");
const environment = require("./env");
const proxy = require("./proxy");

module.exports = {
  devtool: "inline-cheap-module-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: path.join(__dirname, "../src"),
        use: ["thread-loader", "style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "thread-loader",
          "style-loader",
          "css-loader",
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
    proxy: proxy,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
