let path = require("path");
let fs = require("fs");
let shell = require("child_process");
let fsExtra = require("fs-extra");

//切换目录，运行打包命令
console.log("开始打包web页面");
shell.execSync("npm run release", { cwd: "./web" });
console.log("打包web页面结束");
console.log("开始打包客户端嵌入脚本");
shell.execSync("npm run release", { cwd: "./client" });
console.log("打包客户端嵌入脚本结束");
//将打包结果放入到客户端壳中
if (!fs.existsSync(__dirname + "/build")) {
    fs.mkdirSync(__dirname + "/build");
}
//复制应用程序壳
console.log("开始生成客户端");
fsExtra.copySync(path.join(__dirname, "/lib/win32"), path.join(__dirname, "/build/win32"));
fsExtra.copySync(path.join(__dirname, "/lib/win64"), path.join(__dirname, "/build/win64"));
if (!fs.existsSync(__dirname + "/build/win32/resources/app")) {
    fs.mkdirSync(__dirname + "/build/win32/resources/app");
}
if (!fs.existsSync(__dirname + "/build/win64/resources/app")) {
    fs.mkdirSync(__dirname + "/build/win64/resources/app");
}
fsExtra.copySync(path.join(__dirname, "/client/build"), path.join(__dirname, "/build/win32/resources/app"));
fsExtra.copySync(path.join(__dirname, "/client/build"), path.join(__dirname, "/build/win64/resources/app"));
console.log("生成客户端结束");