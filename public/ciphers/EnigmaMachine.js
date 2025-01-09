export default class MultiplicativeCipher {

  description = `<p>The Enigma machine was a sophisticated encryption device used primarily by Nazi Germany during World War II to secure military communications. It employed a system of rotors and plugboards to generate complex polyalphabetic ciphers, making it one of the most advanced mechanical cipher systems of its time. Despite its perceived invulnerability, the machine's codes were famously broken by Allied cryptographers, significantly influencing the outcome of the war.</p>
  <p>TODO</p>`;

  parametersHTML = `<label for="rotor1" class="form-label">Rotor #1 start</label>
    <input class="form-control" value="0" id="rotor1" />
    <label for="rotor2" class="form-label">Rotor #2 start</label>
    <input class="form-control" value="0" id="rotor2" />
    <label for="rotor3" class="form-label">Rotor #3 start</label>
    <input class="form-control" value="0" id="rotor3" />
    <label for="plugboard" class="form-label">Plugboard</label>
    <input class="form-control" value="ab cd ef" id="plugboard" />`;

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