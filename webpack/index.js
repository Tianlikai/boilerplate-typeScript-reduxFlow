const merge = require("webpack-merge");

const baseConfig = require("./webpack.base");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");
const analyzerConfig = require("./webpack.analyzer");
const dllConfig = require("./webpack.dll");

module.exports = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return merge(baseConfig, devConfig);
    case "production":
      return merge(baseConfig, prodConfig);
    case "analyzer":
      return merge(baseConfig, prodConfig, analyzerConfig);
    case "dll":
      return dllConfig;
    default:
      console.error("不支持该命令!");
      break;
  }
};
