const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.js"),
  devServer: {
    static: {
      directory: path.resolve(__dirname,"dist")
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  output: {
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Google Keep",
      output: "index.html",
      template: "./template.html",
    }),
  ],
};
