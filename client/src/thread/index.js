const { BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

function loadHtml(win) {
    // 加载index.html文件
    win.loadURL(url.format({
        pathname: path.join(__dirname + "/../../", 'web/rio/rio.html'),
        protocol: "file:",
        slashes: true,
    }));
}

module.exports = {
    loadHtml,
}