const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js").commonConfig;

const targetHost = "maicai.api.ddxq.mobi";
const apiHost = targetHost;
const protocol = "https";

const baiduApiHost = "aip.baidubce.com";
const aiApiHost = "tsn.baidu.com";

module.exports = merge(common, {
    mode: "development",
    devtool: "eval",
    devServer: {
        historyApiFallback: true,
        hot: true,
        // disableHostCheck: true,
        compress: true,
        // host: "106.75.216.89",
        port: "9000",
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        // watchContentBase: false,
        liveReload: false,
        // transportMode: "ws",
        // injectClient: false,
        proxy: {
            "/oauth": {
                target: protocol + "://" + baiduApiHost,
                changeOrigin: true,
                cookieDomainRewrite: "localhost",
                headers: {
                    Host: baiduApiHost,
                    Origin: protocol + "://" + baiduApiHost,
                    Referer: protocol + "://" + baiduApiHost + "/"
                }
            },
            "/text2audio": {
                target: protocol + "://" + aiApiHost,
                changeOrigin: true,
                cookieDomainRewrite: "localhost",
                headers: {
                    Host: aiApiHost,
                    Origin: protocol + "://" + aiApiHost,
                    Referer: protocol + "://" + aiApiHost + "/"
                },
                onProxyRes: (proxyRes, req, res) => {
                    console.log("onProxyRes");
                }
            },
            "/cart": {
                target: protocol + "://" + apiHost,
                changeOrigin: true,
                cookieDomainRewrite: "localhost",
                headers: {
                    Host: apiHost,
                    Origin: protocol + "://" + apiHost,
                    Referer: protocol + "://" + apiHost + "/",
                    Cookie: "DDXQSESSID=2f62b19e15b9dcba82c002a07b935433",
                    "ddmc-city-number": "0101",
                    referer: "https://servicewechat.com/wx1e113254eda17715/421/page-frame.html",
                    "user-agent":
                        "Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac",
                    "ddmc-api-version": "9.49.1",
                    "ddmc-build-version": "2.81.4",
                    // "ddmc-longitude": "121.576659",
                    // "ddmc-latitude": "31.294999",
                    "ddmc-app-client-id": "4",
                    "ddmc-uid": "5dc00efda6b55d19079ed3d5",
                    "ddmc-channel": "applet",
                    "ddmc-device-id": "osP8I0ZA_L39Lvj3zX9gQGDNf4n8",
                    accept: "*/*",
                    "content-type": "application/x-www-form-urlencoded",
                    // "ddmc-station-id": "5f9e6ed657597600010e7915",
                    "ddmc-ip": "",
                    "ddmc-os-version": ""
                }
                // onProxyRes: (proxyRes, req, res) => {}
            },
            "/order": {
                target: protocol + "://" + apiHost,
                changeOrigin: true,
                cookieDomainRewrite: "localhost",
                headers: {
                    Host: apiHost,
                    Origin: protocol + "://" + apiHost,
                    Referer: protocol + "://" + apiHost + "/",
                    Cookie: "DDXQSESSID=2f62b19e15b9dcba82c002a07b935433",
                    "ddmc-city-number": "0101",
                    referer: "https://servicewechat.com/wx1e113254eda17715/421/page-frame.html",
                    "user-agent":
                        "Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac",
                    "ddmc-api-version": "9.49.1",
                    "ddmc-build-version": "2.81.4",
                    "ddmc-longitude": "121.576659",
                    "ddmc-latitude": "31.294999",
                    "ddmc-app-client-id": "4",
                    "ddmc-uid": "5dc00efda6b55d19079ed3d5",
                    "ddmc-channel": "applet",
                    "ddmc-device-id": "osP8I0ZA_L39Lvj3zX9gQGDNf4n8",
                    accept: "*/*",
                    "content-type": "application/x-www-form-urlencoded",
                    "ddmc-station-id": "5f9e6ed657597600010e7915",
                    "ddmc-ip": "",
                    "ddmc-os-version": ""
                }
                // onProxyRes: (proxyRes, req, res) => {}
            }
        }
    },
    // new webpack.NamedModulesPlugin()
    plugins: [new webpack.HotModuleReplacementPlugin()]
});
