export default class CipherBlockChaining extends EventTarget {

  #descriptionHTML = `<ul class="nav nav-tabs mb-3" id="menu">
      <li class="nav-item">
        <a href="#description" class="nav-link active" data-bs-toggle="tab">Decription</a>
      </li>
      <li class="nav-item">
        <a href="#code" class="nav-link" data-bs-toggle="tab">Code</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane fade show active" id="description">    
        <p>Cipher Block Chaining (CBC) is a <a href="https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation">block cipher mode of operation</a> where each plaintext block is combined with the previous ciphertext block before being encrypted, ensuring that identical plaintext blocks produce different ciphertexts and providing better diffusion and security.</p>
        <p>An Initialization Vector (IV) is used in the first block to ensure that the encryption of the first block is random and independent of the key, enhancing security by preventing identical ciphertexts for identical plaintexts across different sessions. The inclusion of the IV with the ciphertext is crucial for decryption to work properly.<p>
        <p>C<sup>1</sup> = e<sup>k</sup>(B<sup>1</sup> ​⊕ IV)</p>
        <p>C<sup>i</sup> = e<sup>k</sup>(B<sup>i</sup> ​⊕ C<sup>i-1</sup>), for i > 1</p>
      </div>
      <div class="tab-pane fade" id="code">
        <pre>
          function CBC_Encrypt(plaintext, key, iv, block_size):
            blocks = split_into_blocks(plaintext, block_size)
            ciphertext = []
            previous_block = iv
            for each block in blocks:
                xor_block = XOR(block, previous_block)
                encrypted_block = Encrypt_Block(xor_block, key)
                ciphertext.append(encrypted_block)
                previous_block = encrypted_block
            return concatenate(ciphertext)

          function CBC_Decrypt(ciphertext, key, iv, block_size):
            blocks = split_into_blocks(ciphertext, block_size)
            plaintext = []
            previous_block = iv
            for each block in blocks:
                decrypted_block = Encrypt_Block(block, key)
                plaintext_block = XOR(decrypted_block, previous_block)
                plaintext.append(plaintext_block)
                previous_block = block
            return concatenate(plaintext)
        </pre>
      </div>
    </div>`;

  #parametersHTML = `<label for="secretKey" class="form-label">Secret key</label>
    <input class="form-control" value="12345" id="secretKey" />
    <label for="blockSize" class="form-label">Block size</label>
    <input class="form-control" value="5" id="blockSize" />`;

  constructor(parameters) {
    super();
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

    if (plaintext === "") {
      return "";
    }

    const iv = Array.from({ length: blockSize }, () => String.fromCharCode(Math.floor(Math.random() * 94) + 33)).join('');

    let paddedPlaintext = this.#padBlock(plaintext, blockSize);    
    let ciphertext = '';
    let previousBlock = iv; // First block is XORed with the IV

    const regex = new RegExp(`.{1,${blockSize}}`, 'g');
    const blocks = paddedPlaintext.match(regex);

    // Process each block
    for (let i = 0; i < blocks.length; i += 1) {
      // let block = paddedPlaintext.slice(i, i + blockSize);

      blocks[i] = this.#xorBlock(blocks[i], previousBlock); // XOR with previous ciphertext (or IV for the first block)
      blocks[i] = this.#xorBlock(blocks[i], key); // Simulate encryption by XORing with key (you can replace with real encryption)
      ciphertext += blocks[i]; // XOR each block with the key
      
      previousBlock = blocks[i];
    }

    console.log(blocks);
    

    return iv + ciphertext;
  }

  /**
   * Return a string of plaintext from ciphertext
   * @param {String} ciphertext 
   * @returns {String}
   */
  decipher(ciphertext) {
    const key = this.parameters.querySelector("#secretKey").value;
    const blockSize = parseInt(this.parameters.querySelector("#blockSize").value);

    if (ciphertext === "") {
      return "";
    }

    let plaintext = '';
    // let previousBlock;

    const regex = new RegExp(`.{1,${blockSize}}`, 'g');
    const blocks = ciphertext.match(regex);

    let iv = blocks.shift();
    let previousBlock = iv;

    console.log(blocks);

    // Process each block
    for (let i = 0; i < blocks.length; i += 1) {
      // const encryptedBlock = ciphertext.slice(i, i + blockSize);

      // // get iv from first block
      // if (i === 0) {
      //   previousBlock = blocks[i];
      //   continue;
      // }

      blocks[i] = this.#xorBlock(blocks[i], key); // Decrypt the block
      blocks[i] = this.#xorBlock(blocks[i], previousBlock); // XOR with the previous block (or IV)
      plaintext += blocks[i];

      previousBlock = blocks[i];
    }

    return this.#unpadBlock(plaintext);
  }
}




// export default class CipherBlockChaining {

//   description = `<p>Cipher Block Chaining (CBC) is a <a href="https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation">block cipher mode of operation</a> where each plaintext block is combined with the previous ciphertext block before being encrypted, ensuring that identical plaintext blocks produce different ciphertexts and providing better diffusion and security. <strong>Notice how changing or removing a character at the beginning of the plaintext affects the rest of the ciphertext.</strong></p>
//     <p>An Initialization Vector (IV) is used in the first block to ensure that the encryption of the first block is random and independent of the key, enhancing security by preventing identical ciphertexts for identical plaintexts across different sessions. The inclusion of the IV with the ciphertext is crucial for decryption to work properly.</p>`;

//   parametersHTML = `<label for="secretKey" class="form-label">Secret key</label>
//     <input class="form-control" value="123" id="secretKey" />
//     <label for="blockSize" class="form-label">Block size</label>
//     <input class="form-control" value="5" id="blockSize" />`;

//   // // TODO use this with regular expression valid chars
//   // #alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

//   #ivLength = 5;

//   constructor(parameters) {
//     this.parameters = parameters
    
//     // IV will add randomness to the ciphertext even when same plaintext input used
//     this.iv = Array.from({ length: this.#ivLength }, () => String.fromCharCode(Math.floor(Math.random() * 94) + 33)).join('');
//   }

//   /**
//    * XOR two strings (block and key) of the same length
//    * @param {String} block 
//    * @param {String} key 
//    * @returns {String}
//    */
//   #xorBlock(block, key) {
//     return block.split('').map((char, i) =>
//       String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
//     ).join('');
//   }

//   #padBlock(block, blockSize) {
//       // Add padding to make the block size match
//       const padding = blockSize - block.length;
//       return block + String.fromCharCode(padding).repeat(padding);
//   }

//   #unpadBlock(block) {
//       // Remove padding based on the last character
//       const padding = block.charCodeAt(block.length - 1);
//       return block.slice(0, -padding);
//   }

//   /**
//    * Return an string of ciphertext from plaintext
//    * @param {String} plaintext 
//    * @returns {String}
//    */
//   encipher(plaintext) {
//     const key = this.parameters.querySelector("#secretKey").value
//     const blockSize = parseInt(this.parameters.querySelector("#blockSize").value);
    
//     // IV will add randomness to the ciphertext even when same plaintext input used
//     const iv = this.iv //Array.from({ length: blockSize }, () => String.fromCharCode(Math.floor(Math.random() * 94) + 33)).join('');
        
//     let ciphertext = '';
//     let previousBlock = iv;
    
//     // const plaintextStripped = plaintext.replace(/[^A-Za-z]/gi, '');

//     // Process each block
//     for (let i = 0; i < plaintext.length; i += blockSize) {
//         let block = plaintext.slice(i, i + blockSize);
//         if (block.length < blockSize) {
//             block = this.#padBlock(block, blockSize);
//         }
        
//         const xored = this.#xorBlock(block, previousBlock); // XOR with the previous block (or IV)
//         const encryptedBlock = this.#xorBlock(xored, key); // Encrypt the block
//         ciphertext += encryptedBlock;
//         previousBlock = encryptedBlock;
//     }

//     return ciphertext ? iv + ciphertext : "";
//   }

//   /**
//    * Return a string of plaintext from ciphertext
//    * @param {String} ciphertext 
//    * @returns {String}
//    */
//   decipher(ciphertext) {
//     // const key = this.parameters.querySelector("#key").value    
//     // return ciphertext.replace(/[^A-Za-z]/gi, '').split("").map((char) => this.#decipherChar(char.toUpperCase(), parseInt(key))).join("");

//     const key = this.parameters.querySelector("#secretKey").value
//     const iv = ciphertext.slice(0, this.#ivLength);
//     const blockSize = parseInt(this.parameters.querySelector("#blockSize").value)
    
//     let plaintext = '';
//     let previousBlock = iv;

//     console.log(iv);    

//     // // Process each block
//     // for (let i = 0; i < ciphertext.replace(/[^A-Za-z]/gi, '').length; i += blockSize) {
//     //     const encryptedBlock = ciphertext.slice(i, i + blockSize);
//     //     const xored = this.#xorBlock(encryptedBlock, key); // Decrypt the block
//     //     const decryptedBlock = this.#xorBlock(xored, previousBlock); // XOR with the previous block (or IV)
//     //     plaintext += decryptedBlock;
//     //     previousBlock = encryptedBlock;
//     // }

//     // return this.#unpadBlock(plaintext);
//   }
// }