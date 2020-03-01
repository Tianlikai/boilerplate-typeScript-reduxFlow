const proxy = {
  "/api": {
    target: "http://175.24.75.141:3000/mock/11/",
    pathRewrite: { "^/api": "" },
  },
};
module.exports = proxy;
