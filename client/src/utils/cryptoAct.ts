const crypto = require('crypto');
const uuidV4 = require("uuid/v4");

//生成uuid
function getRandomUuid() {
    let uuid = uuidV4();
    return uuid;
}

function getHash(buffer: Buffer) {
    let hash = crypto.createHash('sha256');
    hash.update(buffer);
    return hash.digest('base64');
}

interface CryptoAct {
    getRandomUuid: () => string;
    getHash: (buffer: Buffer) => string;
}
let cryptoAct: CryptoAct = {
    getRandomUuid,
    getHash,
};

export default cryptoAct;
export {
    CryptoAct
};