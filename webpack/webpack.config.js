// @ts-nocheck
const path = require("path");

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

    // mode: "production",
    mode: "development",
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
            }
        ]
    },

    resolve: {
        extensions: [".js"]
    },

    plugins: [],
};
