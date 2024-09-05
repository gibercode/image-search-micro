const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    publicPath: "http://localhost:3001/", // Cambiar según el puerto del proyecto
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  mode: "development",
  devServer: {
    hot: true,
    port: 3001, // Cambiar según el puerto del proyecto
  },
  module: {
    rules: [
      {
        test: /\.(ts|js|tsx)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new ModuleFederationPlugin({
      name: "searchBar",
      filename: "remoteEntry.js",
      exposes: {
        "./SearchBar": "./src/SearchBar",
        "./store": "./src/stores/photosStore",
      },
      shared: {
        zustand: {
          singleton: true,
          eager: true,
        },
        react: {
          singleton: true, // Asegúrate de que sea singleton
          eager: true, // Esto permite la carga eager
          requiredVersion: "18.3.1",
        },
        "react-dom": {
          singleton: true,
          eager: true, // Lo mismo para react-dom
          requiredVersion: "18.3.1",
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
