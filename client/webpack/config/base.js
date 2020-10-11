var path = require("path");
let webpackCfg = {
    externals: {},
    node: {
        global: false,
        __filename: false,
        __dirname: false,
    },
    entry: {
        main: __dirname + '/../../main.ts',
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /(\.tsx|\.ts)$/,
                loader: 'ts-loader',
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            }
        ]
    },
    output: {
        filename: '[name].js',
    },
    plugins: [],
    target: "electron-main",
};

module.exports = webpackCfg;