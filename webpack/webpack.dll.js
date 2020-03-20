const path = require("path");
const webpack = require("webpack");

/**
 * 每个dll包保持在244k以下
 */
module.exports = {
  mode: "production",
  entry: {
    stable: [
      "axios",
      "classnames",
      "connected-react-router",
      "immutability-helper",
      "qs",
      "react",
      "react-content-loader",
      "react-dom",
      "react-event-listener",
      "react-helmet",
      "react-redux",
      "react-router",
      "react-router-dom",
      "redux",
      "redux-saga",
      "reselect",
    ],
  },
  output: {
    path: path.resolve(__dirname, "../dll"),
    filename: "[name].[chunkhash:8].dll.js",
    library: "[name]_[chunkhash:8]_dll",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_[chunkhash:8]_dll",
      path: path.resolve(__dirname, "../dll", "[name].manifest.json"),
    }),
  ],
};
