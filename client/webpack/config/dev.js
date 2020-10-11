let merge = require("webpack-merge");
var path = require("path");
let webpack = require('webpack');
let base = require("./base");

let config = merge(base, {
    output: {
        path: path.resolve(__dirname + "/../../", "build"),
    },
    devtool: "source-map",
    devServer: {
        contentBase: "./",
        inline: true,
        hot: true,
        port: 3001,
    },
});
if (!config.plugins) {
    config.plugins = [];
}
config.plugins.push(new webpack.HotModuleReplacementPlugin());
module.exports = config;