let merge = require("webpack-merge");
var path = require("path");
let base = require("./base");

let config = merge(base, {
    output: {
        path: path.resolve(__dirname + "/../../", "build"),
    }
});

module.exports = config;