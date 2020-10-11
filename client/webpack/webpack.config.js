let process = require("process");
let webpack = require("webpack");
let shell = require("child_process");
let fs = require("fs");
let path = require("path");
let devConfig = require("./config/dev");
let releaseConfig = require("./config/release");

//打包前拷贝必要的文件
function copyFile() {
    let buildPath = path.join(__dirname + "/../", "build/");
    let curPath = path.join(__dirname, "/../");
    //拷贝project文件
    if (!fs.existsSync(buildPath)) {
        fs.mkdirSync(buildPath);
    }
    let orgPath = curPath + "project.json";
    let destPath = buildPath + "project.json";
    fs.copyFileSync(orgPath, destPath, fs.constants.COPYFILE_FICLONE);
}
//打包前写入必要的文件
function writeFile() {
    //写入package.json文件，不然客户端运行不起来
    let package = {
        name: "react-electron",
        version: "1.0.0",
        description: "",
        main: "main.js",
        scripts: {},
        author: "liutao",
        license: "ISC"
    };
    let buildPath = path.join(__dirname + "/../", "build/");
    if (!fs.existsSync(buildPath)) {
        fs.mkdirSync(buildPath);
    }
    fs.writeFileSync(buildPath + "package.json", JSON.stringify(package));
}

//webpack编译文件(编译完成后运行electron的命令)
function compileClient() {
    //读取npm中设置的环境变量
    let mode = process.env.mode;
    function callback(error, stats) {
        if (error) {
            console.log(error);
            return;
        }
        console.log(stats.toString({ colors: true, chunks: true, children: false, }));
        if (mode == "release") {
            return;
        }
        shell.exec("electron ./build/main.js", function (error) {
            error && console.log(error);
        });
    }
    if (mode == "dev") {
        let compiler = webpack(devConfig);
        compiler.watch({}, callback);
    } else if (mode == "release") {
        let compiler = webpack(releaseConfig);
        compiler.run(callback);
    }
}
function packClient() {
    copyFile();
    writeFile();
    compileClient();
}
packClient();
module.exports = {
    packClient,
};

