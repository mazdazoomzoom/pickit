import CryptoJS from 'crypto-js';

function encrypt(data) {
    const stringData = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(
        stringData,
        process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY
    ).toString();
    return encodeURI(encryptedData);
}

function decrypt(data) {
    const decryptedData = CryptoJS.AES.decrypt(
        decodeURI(data),
        process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    return decryptedData;
}

export { encrypt, decrypt };
