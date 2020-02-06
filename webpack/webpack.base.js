const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src/app/", "index.tsx")
  },
  output: {
    path: path.resolve(__dirname, "../dist")
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.t(s|sx)?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images",
            limit: "1024"
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp4)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/template", "index.html"),
      inject: true,
      favicon: path.resolve(__dirname, "../public/", "rl.ico")
    })
  ]
};
