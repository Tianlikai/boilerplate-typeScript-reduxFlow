const path = require("path");
const webpack = require("webpack");

const config = require("./config");
const publicPath = `${config.PROTOCOL}://${config.HOST}:${config.PORT}/`;

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  cache: true,
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    publicPath
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUni: 75,
              remPrecision: 8
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../src"),
    host: config.HOST,
    port: config.PORT,
    // open: true,
    hot: true,
    https: config.PROTOCOL === "https",
    overlay: true,
    compress: true,
    stats: { color: true },
    historyApiFallback: true
  }
};
