import { BrowserWindow } from 'electron';
import { CryptoAct } from './utils/cryptoAct';
import { FileAct } from './utils/fileAct';

//prject文件数据结构
interface Project {
    version?: string,                    //版本号
    serverAddr?: string,                 //服务器地址
    updateAddr?: string,                 //热更新地址
    showConsole?: boolean,               //是否显示控制台
    ignoreCertificate?: boolean,         //是否忽略https证书
    isDevMode?: boolean,                 //是否是开发模式
}
//在global上定义全局变量
declare global {
    namespace NodeJS {
        interface Global {
            project: Project,
            mainWin: BrowserWindow,
            fileAct: FileAct,
            cryptoAct: CryptoAct,
            electron: any,
        }
    }
}

export {
    Project,
};