module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 2,
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ];
  const plugins = [
    ["react-hot-loader/babel"],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-syntax-dynamic-import"],
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css",
      },
      "antd",
    ],
    [
      "react-intl",
      {
        messagesDir: "./reactIntl/messages/",
        removeDefaultMessage: false,
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
