const proxy = {
  "/api": {
    target: "http://175.24.75.141:3000/mock/13/",
    pathRewrite: { "^/api": "" },
  },
};
module.exports = proxy;
