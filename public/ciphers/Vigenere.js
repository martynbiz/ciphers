export default class MultiplicativeCipher {

  description = `<p>TODO</p>`;

  parametersHTML = `<label for="key" class="form-label">Key</label>
    <input class="form-control" value="3" id="key" />`;

  // // TODO use this with regular expression valid chars
  // #alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor(parameters) {
    this.parameters = parameters
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