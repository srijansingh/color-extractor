const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '.env') }); 

const isDevelopment = process.env.NODE_ENV !== "production";
module.exports = env => {
  console.log({env})
  return ({
    mode: isDevelopment ? "development" : "production",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    devtool: isDevelopment ? "inline-source-map" : false,
    devServer: {
      port: 3000,
      hot: true, // enable hot module replacement
    },
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' },
      },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.scss$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "autoprefixer",
                      {
                        grid: true,
                      },
                    ],
                  ],
                },
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      !isDevelopment &&
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
        }),
        new NodePolyfillPlugin(),
        new webpack.DefinePlugin({
          "process.env": JSON.stringify(dotenv.config().parsed)
        }),
    ].filter(Boolean),
    optimization: {
      minimize: !isDevelopment,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
  })
};
