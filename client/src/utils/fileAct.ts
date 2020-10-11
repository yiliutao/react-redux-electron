import *  as fs from 'fs';
import { dialog } from 'electron';

//选择文件保存目录
function selectSaveFile(fileName: string, filter = { name: "Pdf", extensions: ["pdf"] }, title = "保存文件", defaultPath = "~/Desktop/") {
    let path = defaultPath + fileName;
    let dlgOpts = {
        title: title,
        defaultPath: path,
        filters: [filter],
    };
    return dialog.showSaveDialogSync(global.mainWin, dlgOpts);
}

//选择文件选择目录
function selectOpenFile(callback: (path: string) => void, filter = { name: "Pdf", extensions: ["pdf"] }, title = "选择文件", defaultPath = "~/Desktop/") {
    //设置打开对话框属性
    let dlgProps = {
        title: title,
        defaultPath: defaultPath,
        filters: [filter],
    };
    //文件选择对话框
    dialog.showOpenDialog(global.mainWin, dlgProps, (filePaths: Array<string>) => {
        if (!filePaths || filePaths.length <= 0) {
            return;
        }
        let filePath = filePaths[0];
        callback && callback(filePath);
    });
}

//同步判断文件是否存在
function existsSync(path: string) {
    return fs.existsSync(path);
}
//同步创建目录
function mkdirSync(path: string) {
    fs.mkdirSync(path);
}
//同步读取文件
function readFileSync(path: string, options = null) {
    return fs.readFileSync(path, options);
}
//同步写入文件
function writeFileSync() {
    if (arguments.length < 2 || arguments.length > 3) {
        console.log("writeFileSync函数传入参数数量不正确");
        return;
    }
    let path = arguments[0];
    //如果不存在当前目录则创建当前目录
    let dirSplit = path.split("/");
    if (dirSplit.length > 1) {
        dirSplit.pop();
        let dir = dirSplit.join("/");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
    if (arguments.length == 2) {
        fs.writeFileSync(path, arguments[1]);
    }
    if (arguments.length == 3) {
        fs.writeFileSync(path, arguments[1], arguments[2]);
    }
}
//异步写入文件
function writeFile() {
    //如果不存在当前目录则创建当前目录
    if (arguments.length < 3 || arguments.length > 4) {
        console.log("writeFile函数传入参数数量不正确");
        return;
    }
    let path = arguments[0];
    let dirSplit = path.split("/");
    if (dirSplit.length > 1) {
        dirSplit.pop();
        let dir = dirSplit.join("/");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
    if (arguments.length == 3 && typeof arguments[2] == "function") {
        fs.writeFile(path, arguments[1], arguments[2]);
    }
    if (arguments.length == 4) {
        fs.writeFile(path, arguments[1], arguments[2], arguments[3]);
    }
}

interface FileAct {
    selectOpenFile: (callback: (path: string) => void, filters: any) => void;
    selectSaveFile: (fileName: string, filters: any) => string | undefined;
    existsSync: (path: string) => boolean;
    readFileSync: (path: string, options: any) => Buffer;
    writeFileSync: () => void;
    mkdirSync: (path: string) => void;
    writeFile: () => void;
}
const fileAct: FileAct = {
    selectOpenFile,
    selectSaveFile,
    existsSync,
    readFileSync,
    writeFileSync,
    mkdirSync,
    writeFile,
};
export default fileAct;
export {
    FileAct,
}