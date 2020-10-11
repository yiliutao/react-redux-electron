interface FsOption {
    encoding?: string;
}
interface writeFileSync {
    (path: string, content: string): void;
    (path: string, content: string, option: FsOption): void;
};
interface writeFile {
    (path: string, content: string, callback: (error: any) => void): void;
    (path: string, content: string, option: FsOption, callback: (error: any) => void): void;
}
export default interface FileAct {
    selectOpenFile: (callback: (path: string) => void, filter?: any, title?: string, defaultPath?: string) => void;
    selectSaveFile: (fileName: string, callback: (path: string) => void, filter?: Array<any>, title?: string, defaultPath?: string) => void;
    existsSync: (path: string) => boolean;
    mkdirSync: (path: string) => void;
    readFileSync: (path: string, option?: any) => string;
    writeFileSync: writeFileSync;
    writeFile: writeFile;
}