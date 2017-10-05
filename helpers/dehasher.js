var CryptoJS = require("crypto-js");

function decrypt (password, salt) {
    var bytes  = CryptoJS.AES.decrypt(password.toString(), salt);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext
}


module.exports = decrypt
