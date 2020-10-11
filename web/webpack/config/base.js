var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");

var webpack = require("webpack");
var pages = require("../pages.json");
let config = {
    externals: {
        electron: "electron",
    },
    entry: {
        "common/lib": ["react", "react-redux", "react-router-dom", "antd", "react-dom", "babel-polyfill"],
    },
    output: {
        path: path.resolve(__dirname + "/../../", "src/"),
        filename: "[name].js",
        chunkFilename: "js/[name].chunk.js",
        publicPath: "../",
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ["common/lib"],
            minChunks: Infinity
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ],
    resolve: {
        extensions: [".ts", ".js", ".json", ".tsx", ".jsx", ".less"],
        alias: {
            "@pages": `${process.cwd()}/src/pages/main/views/biz`,
            "@biz-routers": `${process.cwd()}/src/static/biz/moduleAuth`,
            "@static": `${process.cwd()}/src/static`,
            "@component": `${process.cwd()}/src/component`,
            "@lwRedux": `${process.cwd()}/src/redux`,
            "@middleware": `${process.cwd()}/src/middleware`,
            "@shell": `${process.cwd()}/src/shell`,
        }
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "react", "es2015", "stage-2"],
                        plugins: [
                            ["import", { libraryName: "antd", style: "css" }]
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                loader: "url-loader?limit=8192&name=common/imgs/[hash].[ext]"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /(\.tsx|\.ts)$/,
                loader: 'ts-loader',
            },
            {
                test: /\.svg$/,
                loader: "svg-url-loader?limit=8192&name=common/imgs/[hash].[ext]"
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                loader: "file-loader?name=common/fonts/[name].[ext]"
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            }
        ]
    }
};
//生成页面模板列表
for (let i = 0; i < pages.length; i++) {
    let pageCode = pages[i]["pageCode"];
    let pageEntry = pages[i]["entry"];
    let pageHtml = pages[i]["page"];
    let pagePath = pages[i]["path"];
    config.entry[pageCode + "/" + pageCode] = path.resolve(__dirname + "/../../", pageEntry);
    config.plugins.push(
        new htmlWebpackPlugin({
            filename: pageCode + "/" + pageHtml,
            template: __dirname + "/../../" + pagePath + pageHtml,
            inject: "body",
            hash: true,
            chunks: [(pageCode + "/" + pageCode), "common/lib"]
        })
    );
}
module.exports = config;