export default class MultiplicativeCipher extends EventTarget {

  #descriptionHTML = `<p><a href="https://en.wikipedia.org/wiki/RSA">RSA</a> (Rivest-Shamir-Adleman) is one of the most widely used public-key cryptosystems for secure data transmission. It relies on the mathematical properties of large prime numbers and their product to create a pair of keys: a public key for encryption and a private key for decryption</p>
    <p>The security of RSA is based on the difficulty of factoring the product of two large primes, a problem that remains computationally infeasible with current technology for sufficiently large numbers</p>
    <p>The public key (e, n) is used for encryption.</p>
    <p>The private key (d, n) is used for decryption.</p>
    <p>The public and private keys are mathematically related, with d being calculated based on e, p, and q (the prime factors of n).</p>
    <p>RSA is commonly used in securing communications, digital signatures, and key exchanges in modern cryptographic systems.</p>
    <p><a href="https://www.khanacademy.org/computing/computer-science/cryptography/modern-crypt/v/intro-to-rsa-encryption">https://www.khanacademy.org/.../intro-to-rsa-encryption</a></p>`;

  #parametersHTML = `<label for="publicExponent" class="form-label">Public exponent</label>
    <input class="form-control" value="7" id="publicExponent" readonly />
    <label for="privateExponent" class="form-label">Private exponent</label>
    <input class="form-control" value="55" id="privateExponent" readonly />
    <label for="modulus" class="form-label">Modulus</label>
    <input class="form-control" value="23" id="modulus" readonly />`;

  // // TODO use this with regular expression valid chars
  // #alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
    document.getElementById("publicExponent").addEventListener("input", emitChange);
    document.getElementById("privateExponent").addEventListener("input", emitChange);
    document.getElementById("modulus").addEventListener("input", emitChange);
  }

  // /**
  //  * Return substitution character
  //  * @param {String} char 
  //  * @returns {String}
  //  */
  // #encipherChar(char, key) {
  //   const charNum = this.#alphabet.indexOf(char)
  //   const shiftedNum = charNum * key;
  //   const shiftedChar = this.#alphabet[modular(shiftedNum, this.#alphabet.length)];
  //   return shiftedChar;
  // }

  // /**
  //  * Return substitution character
  //  * @param {String} char 
  //  * @returns {String}
  //  */
  // #decipherChar(char, key) {
  //   const mod = this.#alphabet.length
  //   const charNum = this.#alphabet.indexOf(char);    
  //   const shiftedNum = charNum * modularInverse(key, this.#alphabet.length);
  //   const shiftedChar = this.#alphabet[modular(shiftedNum, this.#alphabet.length)];
  //   return shiftedChar;
  // }

  /**
   * Return an string of ciphertext from plaintext
   * @param {String} plaintext 
   * @returns {String}
   */
  encipher(plaintext) {
    // const key = this.parameters.querySelector("#key").value
    // return plaintext.replace(/[^A-Za-z]/gi, '').split("").map((char) => this.#encipherChar(char.toUpperCase(), parseInt(key))).join("");
  }

  /**
   * Return a string of plaintext from ciphertext
   * @param {String} ciphertext 
   * @returns {String}
   */
  decipher(ciphertext) {
    // const key = this.parameters.querySelector("#key").value    
    // return ciphertext.replace(/[^A-Za-z]/gi, '').split("").map((char) => this.#decipherChar(char.toUpperCase(), parseInt(key))).join("");
  }
}