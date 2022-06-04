// @ts-nocheck
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ThemesPlugin = require('./plugins/theme-plugin');

module.exports = {
    entry: {
        app: "./src/index.js"
    },

    output: {
        path: path.resolve(__dirname, "build"), // webpack打包出来的文件
        publicPath: "/", // 影响index.html依赖的文件引用路径
        filename:  "bundle/[name].[chunkhash:6].js", // 针对entry文件的命名
        chunkFilename: "module/[name].[contenthash:6].js" // 针对非chunk文件的命名
    },

    mode: "production",
    // mode: "development",
    // devtool: 'source-map', // 会生产map文件，记录bundle文件对应的源文件及内容
    optimization: {
        concatenateModules: true,
    },

    module: {
        rules: [
            {
                test: /\.(js)?$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, "src"),
                ],
                loader: require.resolve('babel-loader'),
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname, "src")],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            additionalData: `@import "./src/styles/themes/light.scss";`,
                            sassOptions: {
                                outputStyle: "compressed"
                            }
                        }
                    }
                ]
            },
        ]
    },

    resolve: {
        extensions: [".js", ".scss"]
    },

    plugins: [
        new ThemesPlugin(),

        // new MiniCssExtractPlugin({
        //     filename: "[name].[hash:6].css",
        //     chunkFilename: "[id].[hash:6].css"
        // }),
    ],
};
