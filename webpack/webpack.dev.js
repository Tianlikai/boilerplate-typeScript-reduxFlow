const path = require("path");
const webpack = require("webpack");
const environment = require("./env");

module.exports = {
  devtool: "inline-cheap-module-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUni: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUni: 75,
              remPrecision: 8,
            },
          },
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
