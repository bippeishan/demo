const merge = require("webpack-merge");
const common = require("./webpack.common.js").commonConfig;
const styleEntry = require("./webpack.common.js").styleEntry;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ThemesGeneratorPlugin = require("./src/plugins/ThemesGeneratorPlugin");

const yargs = require("yargs");
const argv = yargs.argv;

module.exports = merge(common, {
    mode: "production",
    optimization: {
        concatenateModules: true,
        minimize: true
    },
    plugins: [
        new ThemesGeneratorPlugin({
            styleEntry: styleEntry
        }),
        // typescript格式检查
        new ForkTsCheckerWebpackPlugin({
            tsconfig: "tsconfig.json",
            checkSyntacticErrors: true
        }),
        argv.CONSOLE_VERSION ? null : new (require("./src/plugins/VersionPlugin"))()
    ].filter((ele) => ele)
});
