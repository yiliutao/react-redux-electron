let merge = require("webpack-merge");
var hotModuleReplace = require("webpack/lib/HotModuleReplacementPlugin");
var path = require("path");
let base = require("./base");

let config = merge(base, {
    output: {
        path: path.resolve(__dirname + "/../../../", "client/build/web"),
    },
    devtool: "source-map",
    devServer: {
        contentBase: "./",
        inline: true,
        hot: true,
        port: 3000,
    },
});
config.plugins.push(new hotModuleReplace());

module.exports = config;