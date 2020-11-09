const crypto = require('crypto-js');
const salt_len = iv_len = 16;

const createKey = (key, salt) => crypto.PBKDF2(
  key,
  salt,
  { keySize: 256 / 32, iterations: 10000, hasher: crypto.algo.SHA256 }
);

var cryptor = {
  encrypt: (input, passphrase) => {
    if (typeof input !== 'string') {
      input = JSON.stringify(input);
    }

    const salt = crypto.lib.WordArray.random(salt_len);
    const iv = crypto.lib.WordArray.random(iv_len);
    const encrypted = crypto.AES.encrypt(input, createKey(passphrase, salt), { iv }).ciphertext;

    return crypto.lib.WordArray.create().concat(salt).concat(iv).concat(encrypted).toString(crypto.enc.Base64);
  },

  decrypt: (crypted, passphrase) => {
    const encrypted = crypto.enc.Base64.parse(crypted);
    const salt = crypto.lib.WordArray.create(
      encrypted.words.slice(0, salt_len / 4)
    );
    const iv = crypto.lib.WordArray.create(
      encrypted.words.slice(0 + salt_len / 4, (salt_len + iv_len) / 4)
    );
    const decrypted = crypto.AES.decrypt(
      {
        ciphertext: crypto.lib.WordArray.create(
          encrypted.words.slice((salt_len + iv_len) / 4)
        )
      },
      createKey(passphrase, salt),
      { iv: iv }
    );

    return decrypted.toString(crypto.enc.Utf8);
  }
};

module.exports = cryptor;
if (window) window.cryptor = cryptor;
