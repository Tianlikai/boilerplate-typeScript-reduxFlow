const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    react: ["react", "react-dom", "react-router", "react-router-dom"],
    // eCharts: ["echarts"],
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
