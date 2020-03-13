const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src", "index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [path.resolve(__dirname, "../node_modules")],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: "thread-loader" },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images",
            limit: "1024",
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp4)$/,
        loader: "file-loader",
        options: {
          name: "[name]_[hash].[ext]",
          outputPath: "fonts",
          limit: "1024",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public", "index.html"),
      inject: true,
      favicon: path.resolve(__dirname, "../public", "rl.ico"),
      minify: {
        collapseWhitespace: true,
      },
    }),
    new HardSourceWebpackPlugin(),
  ],
};
