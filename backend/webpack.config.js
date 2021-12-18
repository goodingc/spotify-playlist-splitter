const path = require("path");

module.exports = {
  entry: "./index.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    libraryTarget: "umd",
    // globalObject: "this"
  },
  target: "node",
  optimization: {
    minimize: false, // enabling this reduces file size and readability
  },
};
