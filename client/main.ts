import { app, BrowserWindow, dialog, Menu } from "electron";
import * as electron from 'electron';
import * as path from "path";
import * as fs from "fs";
import * as url from 'url';
import * as process from "process";
import { Project } from './src/common';
import cryptoAct from './src/utils/cryptoAct';
import fileAct from './src/utils/fileAct';

//确保程序单实例运行
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // 当运行第二个实例时,将会聚焦到第一个实例的主窗口
        if (global.mainWin) {
            if (global.mainWin.isMinimized()) {
                global.mainWin.restore();
            }
            global.mainWin.focus()
        }
    })
    // 创建主窗口, 加载应用的其余部分
    app.on('ready', () => {
        //加载全局变量
        global.project = getProjectFile();
        global.fileAct = fileAct;
        global.cryptoAct = cryptoAct;
        global.electron = electron;
        //安全证书认证
        if (global.project && global.project.ignoreCertificate) {
            app.commandLine.appendSwitch('ignore-certificate-errors');
        }
        createWindow();
    });
}

//读取project文件
function getProjectFile(): Project {
    let project: Project = {};
    try {
        let appPath = app.getAppPath();
        project = JSON.parse(fs.readFileSync(path.resolve(appPath, "project.json"), { encoding: "utf8" }));
    } catch (e) {
        showErrorMsg("启动客户端失败！", "解析project.json异常：" + e.message);
    }
    return project;
}

//创建页面窗口
function createWindow() {
    //去掉菜单栏，并测试热更新问题
    Menu.setApplicationMenu(null);
    // 创建浏览器窗口
    global.mainWin = new BrowserWindow({
        width: 1920,
        height: 1200,
        resizable: true,
        webPreferences: {
            nodeIntegration: true
        },
        show: true,
    });
    //打开开发者工具
    if (global.project && global.project.showConsole) {
        global.mainWin.webContents.openDevTools();
    }
    // 加载index.html文件
    global.mainWin.loadURL(url.format({
        pathname: path.join(__dirname, 'web/index/index.html'),
        protocol: "file:",
        slashes: true,
    }));
    global.mainWin.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        delete global.mainWin;
    });
}

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (global.mainWin === null) {
        createWindow();
    }
});

//显示错误信息，调试模式下显示详细信息，非调试模式显示可阅读提示
function showErrorMsg(releaseMsg = "", debugMsg = "") {
    if (global.project && global.project.isDevMode) {
        dialog.showErrorBox("错误提示", debugMsg);
    } else {
        dialog.showErrorBox("错误提示", releaseMsg);
    }
}

//监听应用中的报错
process.on("uncaughtException", function (error: any) {
    if (error.errno == "EACCES") {
        dialog.showErrorBox("错误信息", "本地文件路径拒绝访问。请检查您的客户端存储路径！（文件夹名包含空格、层级太深、没有访问权限都可能造成此问题）");
    }
    if (error.errno == "EADDRINUSE") {
        dialog.showErrorBox("错误信息", "出现网络问题，访问地址已被占用。请联系平台服务提供商。");
    }
    if (error.errno == "ECONNREFUSED") {
        dialog.showErrorBox("错误信息", "出现网络问题，连接服务失败。请联系平台服务提供商。");
    }
    if (error.errno == "EEXIST") {
        dialog.showErrorBox("错误信息", "已存在相同名称的文件！");
    }
    if (error.errno == "ENOENT") {
        dialog.showErrorBox("错误信息", "出现异常，请联系平台服务提供商。");
    }
    if (error.errno == "ENOTFOUND") {
        dialog.showErrorBox("错误信息", "出现网络问题，请求中的DNS查找失败。请联系平台服务提供商。");
    }
    if (error.errno == "ETIMEDOUT") {
        dialog.showErrorBox("错误信息", "操作或请求超时，请稍候重试。若问题始终存在，请联系平台服务提供商。");
    }
    if (error.code == "CERT_NOT_YET_VALID") {
        dialog.showErrorBox("错误信息", "本地时间或安全证书设置异常。");
    }
});