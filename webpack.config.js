const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  // target: "node",
  entry: "./app/Main.js",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "app"),
    filename: "bundled.js"
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3000,
    static: path.join(__dirname, "app"),
    hot: true,
    historyApiFallback: { index: "index.html" }
    // static: {
    //   directory: path.join(__dirname, "app")
    // }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              ["@babel/preset-env", { targets: { node: "12" } }]
            ]
          }
        }
      }
    ]
  },
  // resolve: {
  //   fallback: {
  //     zlib: require.resolve("browserify-zlib"),
  //     path: require.resolve("path-browserify"),
  //     stream: require.resolve("stream-browserify")
  //   }
  // }

  plugins: [new NodePolyfillPlugin()]
};
