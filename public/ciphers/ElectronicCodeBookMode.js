export default class ElectronicCodeBook extends EventTarget {

  #descriptionHTML = `<p>Electronic Code Book Mode (ECB) is a <a href="https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation">block cipher mode of operation</a> where the message is divided into blocks and each block is encrypted separately. While easy to implement, ECB lacks diffusion, meaning identical plaintext blocks are encrypted into identical ciphertext blocks, revealing data patterns. As a result, ECB is not recommended for cryptographic protocols.<p>`;

  #parametersHTML = `<label for="secretKey" class="form-label">Secret key</label>
    <input class="form-control" value="12345" id="secretKey" />
    <label for="blockSize" class="form-label">Block size</label>
    <input class="form-control" type="number" value="5" id="blockSize" min="0" max="128" />`;

  constructor(parameters) {
    super();
    this.parameters = parameters
  }

  init(descriptionContainer, paramtersContainer) {
    descriptionContainer.innerHTML = this.#descriptionHTML;
    paramtersContainer.innerHTML = this.#parametersHTML;

    const emitChange = (e) => {
      const data = { value: e.target.value }; // Example data to send with the event
      const event = new CustomEvent('change_parameters', { detail: data });
      this.dispatchEvent(event); // Dispatch the event
    }

    // Attach input listener
    document.getElementById("secretKey").addEventListener("input", emitChange);
    document.getElementById("blockSize").addEventListener("input", emitChange);
  }

  #xorBlock(block, key) {
    // XOR each character in the block with the corresponding key character
    let result = '';
    for (let i = 0; i < block.length; i++) {
      result += String.fromCharCode(block.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  }

  #padBlock(block, blockSize) {
    // Pad the block to the specified block size using PKCS7
    const paddingLength = blockSize - (block.length % blockSize);
    const paddingChar = String.fromCharCode(paddingLength);
    return block + paddingChar.repeat(paddingLength);
  }

  #unpadBlock(block) {
    // Remove the padding by reading the padding length from the last byte
    const paddingLength = block.charCodeAt(block.length - 1);
    return block.slice(0, -paddingLength); // Remove padding
  }

  /**
   * Return a string of ciphertext from plaintext
   * @param {String} plaintext 
   * @returns {String}
   */
  encipher(plaintext) {
    const key = this.parameters.querySelector("#secretKey").value;
    const blockSize = parseInt(this.parameters.querySelector("#blockSize").value);

    let paddedPlaintext = this.#padBlock(plaintext, blockSize);
    
    let ciphertext = '';

    // Process each block
    for (let i = 0; i < paddedPlaintext.length; i += blockSize) {
      let block = paddedPlaintext.slice(i, i + blockSize);
      ciphertext += this.#xorBlock(block, key); // XOR each block with the key
    }

    return ciphertext;
  }

  /**
   * Return a string of plaintext from ciphertext
   * @param {String} ciphertext 
   * @returns {String}
   */
  decipher(ciphertext) {
    const key = this.parameters.querySelector("#secretKey").value;
    const blockSize = parseInt(this.parameters.querySelector("#blockSize").value);

    let plaintext = '';
    
    // Process each block
    for (let i = 0; i < ciphertext.length; i += blockSize) {
      let block = ciphertext.slice(i, i + blockSize);
      plaintext += this.#xorBlock(block, key); // XOR each block with the key
    }

    // Unpad the plaintext before returning
    return this.#unpadBlock(plaintext);
  }
}