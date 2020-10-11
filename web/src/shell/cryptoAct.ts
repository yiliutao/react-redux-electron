export default interface CryptoAct {
    getHash: (content: string) => string;
    getRandomUuid: () => string;
}