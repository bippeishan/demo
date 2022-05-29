const merge = require("webpack-merge");
const common = require("./webpack.common.js").commonConfig;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const yargs = require("yargs");
const argv = yargs.argv;

module.exports = merge(common, {
    mode: "production",
    optimization: {
        concatenateModules: true,
        minimize: true
    },
    plugins: [
        // typescript格式检查
        new ForkTsCheckerWebpackPlugin({
            tsconfig: "tsconfig.json",
            checkSyntacticErrors: true
        }),
    ].filter((ele) => ele)
});
