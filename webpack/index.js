const merge = require("webpack-merge");

const comConfig = require("./webpack.base");
const devConfig = require("./webpack.dev");
// const prodConfig = require("./webpack.prod.config");

module.exports = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return merge(comConfig, devConfig);
    case "production":
      //   return merge(comConfig, prodConfig);
      break;
    case "dll":
      break;
    case "analysis":
      break;
    default:
      throw new Error("not exits scripts");
      break;
  }
};
