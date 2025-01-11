export default class CipherFeedback {

  description = `<p>Cipher Feedback (CFB) is a <a href="https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation">block cipher mode of operation</a> where ...</p>`;

  code = `<pre>
    function CFB_Encrypt(plaintext, key, iv, block_size):
      blocks = split_into_blocks(plaintext, block_size)
      ciphertext = []      
      previous_block = iv      
      for block in blocks:
          encrypted_block = Encrypt_Block(previous_block, key)
          xor_result = XOR(block, encrypted_block)
          ciphertext.append(xor_result)
          previous_block = xor_result      
      return concatenate(ciphertext)

    function CFB_Decrypt(ciphertext, key, iv, block_size):
        blocks = split_into_blocks(ciphertext, block_size)
        plaintext = []    
        previous_block = iv    
        for block in blocks:
            encrypted_block = Encrypt_Block(previous_block, key)
            plaintext_block = XOR(block, encrypted_block)
            plaintext.append(plaintext_block)
            previous_block = block    
        return concatenate(plaintext)
        </pre>`;

  parametersHTML = `<label for="secretKey" class="form-label">Secret key</label>
    <input class="form-control" value="12345" id="secretKey" />
    <label for="blockSize" class="form-label">Block size</label>
    <input class="form-control" type="number" value="5" id="blockSize" min="0" max="128" />`;

  constructor(parameters) {
    this.parameters = parameters;
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

  /**
   * Return a string of ciphertext from plaintext
   * @param {String} plaintext 
   * @returns {String}
   */
  encipher(plaintext) {
    const key = this.parameters.querySelector("#secretKey").value;
    const blockSize = parseInt(this.parameters.querySelector("#blockSize").value);

    const iv = this.generateIV(blockSize); // You can generate a random IV or pass it as a parameter
    const blocks = this.splitIntoBlocks(plaintext, blockSize);
    let ciphertext = [];
    let previousBlock = iv;

    for (let block of blocks) {
      const encryptedBlock = this.encryptBlock(previousBlock, key);
      const xorResult = this.xor(block, encryptedBlock);
      ciphertext.push(xorResult);
      previousBlock = xorResult;
    }

    return this.concatenate(ciphertext);
  }

  /**
   * Return a string of plaintext from ciphertext
   * @param {String} ciphertext 
   * @returns {String}
   */
  decipher(ciphertext) {
    const key = this.parameters.querySelector("#secretKey").value;
    const blockSize = parseInt(this.parameters.querySelector("#blockSize").value);

    const iv = this.generateIV(blockSize); // Same IV used for encryption
    const blocks = this.splitIntoBlocks(ciphertext, blockSize);
    let plaintext = [];
    let previousBlock = iv;

    for (let block of blocks) {
      const encryptedBlock = this.encryptBlock(previousBlock, key);
      const plaintextBlock = this.xor(block, encryptedBlock);
      plaintext.push(plaintextBlock);
      previousBlock = block;
    }

    return this.concatenate(plaintext);
  }

  /**
   * Splits a string into blocks of the given block size
   * @param {String} text 
   * @param {Number} blockSize 
   * @returns {Array}
   */
  splitIntoBlocks(text, blockSize) {
    let blocks = [];
    for (let i = 0; i < text.length; i += blockSize) {
      blocks.push(text.slice(i, i + blockSize));
    }
    return blocks;
  }

  /**
   * Generates a random Initialization Vector (IV) of the given block size
   * @param {Number} blockSize 
   * @returns {String}
   */
  generateIV(blockSize) {
    const iv = [];
    for (let i = 0; i < blockSize; i++) {
      iv.push(String.fromCharCode(Math.floor(Math.random() * 256)));
    }
    return iv.join('');
  }

  /**
   * Simulates a block cipher encryption using the key (for demonstration purposes)
   * @param {String} input 
   * @param {String} key 
   * @returns {String}
   */
  encryptBlock(input, key) {
    // Placeholder: Shift character codes based on the length of the key
    return input.split('').map(c => String.fromCharCode(c.charCodeAt(0) + key.length)).join('');
  }

  /**
   * Performs XOR between two strings of equal length
   * @param {String} block 
   * @param {String} encryptedBlock 
   * @returns {String}
   */
  xor(block, encryptedBlock) {
    let result = '';
    for (let i = 0; i < block.length; i++) {
      result += String.fromCharCode(block.charCodeAt(i) ^ encryptedBlock.charCodeAt(i));
    }
    return result;
  }

  /**
   * Concatenates an array of strings into a single string
   * @param {Array} blocks 
   * @returns {String}
   */
  concatenate(blocks) {
    return blocks.join('');
  }
}