let process = require("process");
let webpack = require("webpack");
let devConfig = require("./config/dev");
let releaseConfig = require("./config/release");

function compileWeb() {
    //读取npm中设置的环境变量
    let mode = process.env.mode;
    function callback(error, stats) {
        if (error) {
            console.log(error);
            return;
        }
        console.log(stats.toString({ colors: true, chunks: true, children: false, }));
    }
    if (mode == "dev") {
        let compiler = webpack(devConfig);
        compiler.watch({}, callback);
    } else if (mode == "release") {
        let compiler = webpack(releaseConfig);
        compiler.run(callback);
    }
}
compileWeb();
module.exports = { compileWeb, };
