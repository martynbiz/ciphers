export default class MultiplicativeCipher {

  description = `<p><a href="https://en.wikipedia.org/wiki/Block_cipher">Block ciphers</a> are a type of <a href="https://en.wikipedia.org/wiki/Symmetric-key_algorithm">symmetric encryption</a> algorithm that encrypts data in fixed-size blocks, typically 64 or 128 bits, at a time. They use a secret key to perform several rounds of transformation, including substitution, permutation, and mixing, to convert plaintext into ciphertext.</p>
    <p>Block ciphers are widely used in modern cryptography for securing sensitive data, with well-known examples like <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard">AES</a> (Advanced Encryption Standard) and <a href="https://en.wikipedia.org/wiki/Data_Encryption_Standard">DES</a> (Data Encryption Standard). The security of block ciphers depends on the length of the key, the complexity of the algorithm, and proper key management.</p>
    <p>Block ciphers are strong due to their multiple complex transformation rounds, making decryption without the key infeasible. Longer keys increase the difficulty of <a href="https://en.wikipedia.org/wiki/Brute-force_attack">brute-forcing</a> the cipher, providing stronger security against attacks.</p>`;

  parametersHTML = `<label for="secretKey" class="form-label">Secret key</label>
    <input class="form-control" value="abc123" id="secretKey" />
    <label for="iv" class="form-label">Input Vector (IV)</label>
    <input class="form-control" value="random" id="iv" />
    <label for="blockSize" class="form-label">Block size</label>
    <input class="form-control" value="5" id="blockSize" />`;

  // // TODO use this with regular expression valid chars
  // #alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor(parameters) {
    this.parameters = parameters
  }

  #xorBlock(block, key) {
    // XOR two strings (block and key) of the same length
    return block.split('').map((char, i) => 
        String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i))
    ).join('');
  }

  #padBlock(block, blockSize) {
      // Add padding to make the block size match
      const padding = blockSize - block.length;
      return block + String.fromCharCode(padding).repeat(padding);
  }

  #unpadBlock(block) {
      // Remove padding based on the last character
      const padding = block.charCodeAt(block.length - 1);
      return block.slice(0, -padding);
  }

  /**
   * Return an string of ciphertext from plaintext
   * @param {String} plaintext 
   * @returns {String}
   */
  encipher(plaintext) {
    const key = this.parameters.querySelector("#secretKey").value
    const iv = this.parameters.querySelector("#iv").value
    const blockSize = parseInt(this.parameters.querySelector("#blockSize").value)
    
    let ciphertext = '';
    let previousBlock = iv;

    // Process each block
    for (let i = 0; i < plaintext.length; i += blockSize) {
        let block = plaintext.slice(i, i + blockSize);
        if (block.length < blockSize) {
            block = this.#padBlock(block, blockSize);
        }
        const xored = this.#xorBlock(block, previousBlock); // XOR with the previous block (or IV)
        const encryptedBlock = this.#xorBlock(xored, key); // Encrypt the block
        ciphertext += encryptedBlock;
        previousBlock = encryptedBlock;
    }

    return ciphertext;
  }

  /**
   * Return a string of plaintext from ciphertext
   * @param {String} ciphertext 
   * @returns {String}
   */
  decipher(ciphertext) {
    // const key = this.parameters.querySelector("#key").value    
    // return ciphertext.replace(/[^A-Za-z]/gi, '').split("").map((char) => this.#decipherChar(char.toUpperCase(), parseInt(key))).join("");

    const key = this.parameters.querySelector("#secretKey").value
    const iv = this.parameters.querySelector("#iv").value
    const blockSize = parseInt(this.parameters.querySelector("#blockSize").value)
    
    let plaintext = '';
    let previousBlock = iv;

    // Process each block
    for (let i = 0; i < ciphertext.length; i += blockSize) {
        const encryptedBlock = ciphertext.slice(i, i + blockSize);
        const xored = this.#xorBlock(encryptedBlock, key); // Decrypt the block
        const decryptedBlock = this.#xorBlock(xored, previousBlock); // XOR with the previous block (or IV)
        plaintext += decryptedBlock;
        previousBlock = encryptedBlock;
    }

    return this.#unpadBlock(plaintext);
  }
}