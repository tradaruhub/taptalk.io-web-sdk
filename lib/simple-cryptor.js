const encoder = new TextEncoder();

/**
 * @desc simple encryption using
 * TextEncoder and padStart to create cipher text
 * based on key.length of each pad
 */
const cryptor = {
  encrypt: (input, passphrase) => {
    const cipherText = [...encoder.encode(input)]
      .map(b => {
        return b
          .toString(16)
          .padStart(passphrase.length || 2, passphrase)
      })
      .join('');

    return Buffer.from(cipherText).toString('base64');
  },
  decrypt: (input, passphrase) => {
    const regx = new RegExp(`.{1,${passphrase.length}}`, 'g');
    const decrypted = Buffer.from(input, 'base64').toString().match(regx)
      .map(e => {
        return String.fromCharCode(parseInt(e.substr(e.length - 2), 16));
      }).join('');
      
    return decrypted;
  }
}

module.exports = cryptor;
if (window) window.cryptor = cryptor;
