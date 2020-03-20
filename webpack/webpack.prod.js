// const glob = require("glob");
const path = require("path");
const cssnano = require("cssnano");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
/** TODO: 生产环境打包会丢失html tag & css selector样式 */
// const PurgecssPlugin = require("purgecss-webpack-plugin");

const { getDllPlugins } = require("./util");

// const PATHS = {
//   src: path.join(__dirname, "../src"),
// };

module.exports = {
  output: {
    filename: "[name].[chunkhash:8].js",
    chunkFilename: "[name].[chunkhash:8].chunk.js",
    publicPath: "",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: path.join(__dirname, "../src"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      /**
       * 图片压缩
       */
      // {
      //   test: /\.(png|jpg|svg|gif)$/,
      //   use: [
      //     {
      //       loader: "image-webpack-loader",
      //       options: {
      //         mozjpeg: {
      //           progressive: true,
      //           quality: 65,
      //         },
      //         // optipng.enabled: false will disable optipng
      //         optipng: {
      //           enabled: false,
      //         },
      //         pngquant: {
      //           quality: [0.65, 0.9],
      //           speed: 4,
      //         },
      //         gifsicle: {
      //           interlaced: false,
      //         },
      //         // the webp option will enable WEBP
      //         webp: {
      //           quality: 75,
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
      new TerserPlugin({
        cache: true,
        parallel: true,
        /** 一下两项同时配置，去除所有的注释 */
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: "common",
        },
        eCharts: {
          test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
          chunks: "async",
          name: "eEharts",
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "vendors",
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
      chunkFilename: "[id].[chunkhash:8].css",
    }),
    new AntdDayjsWebpackPlugin(),
    new LodashModuleReplacementPlugin(),
    // new PurgecssPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    // }),
    ...getDllPlugins(),
  ],
};
