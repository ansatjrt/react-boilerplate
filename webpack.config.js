const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TSConfigPathsWebpackPlugin = require("tsconfig-paths-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const BundleAnalyzerWebpackPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = ({env}) => {
  const isDev = env === "development";
  const isProd = !isDev;

  return {
    mode: env,
    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
      path: path.resolve(__dirname, "./build"),
      filename: "[contenthash].bundle.js",
      clean: true,
    },
    optimization: {
      minimize: isProd,
      splitChunks: {
        chunks: "all",
      },
      runtimeChunk: true,
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
      plugins: [new TSConfigPathsWebpackPlugin()],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html"),
      }),
      new ForkTsCheckerWebpackPlugin({
        async: true,
      }),
      new ESLintWebpackPlugin({
        extensions: ["js", "ts", "tsx"],
      }),
      new BundleAnalyzerWebpackPlugin({
        analyzerMode: false,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,

          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/,
          type: "asset/resource",
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
          type: "asset/inline",
        },
      ],
    },
    devtool: isDev && "eval",
    devServer: {
      hot: true,
      port: 3000,
    },
    stats: "errors-warnings",
  };
};
