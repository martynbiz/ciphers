export default class ShiftCipher {

  description = `<p>A shift cipher (or <a href="https://en.wikipedia.org/wiki/Caesar_cipher">Caesar cipher</a>) is a type of <a href="https://en.wikipedia.org/wiki/Substitution_cipher">substitution cipher</a> where each letter in the plaintext is replaced by a letter a fixed number of positions down or up the alphabet.</p>
      <p>C = (P + k) mod 26<p></p>P = (C − k + 26) mod 26<p></p>P is the plaintext letter after decryption; C is the ciphertext letter (converted to its numerical equivalent); k is the key; 26 ensures the result stays within the range of 0 to 25 (the alphabet)</p>
      <p>A shift cipher is a very weak cipher and is not suitable for protecting sensitive information in modern cryptography</p>
      <p><a href="https://www.khanacademy.org/math/algebra">https://www.khanacademy.org/math/algebra</a><br>
      <a href="https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/what-is-modular-arithmetic">https://www.khanacademy.org/.../what-is-modular-arithmetic</a></p>`;

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
  //   const shiftedNum = charNum + key;
  //   const shiftedChar = this.#alphabet[modular(shiftedNum, this.#alphabet.length)];
  //   return shiftedChar;
  // }

  // /**
  //  * Return substitution character
  //  * @param {String} char 
  //  * @returns {String}
  //  */
  // #decipherChar(char, key) {
  //   const charNum = this.#alphabet.indexOf(char);
  //   const shiftedNum = charNum - key;
  //   const shiftedChar = this.#alphabet[modular(shiftedNum, this.#alphabet.length)];
  //   return shiftedChar;
  // }

  #shiftChar(char, shift) {
    // Get the Unicode code point of the character
    let codePoint = char.codePointAt(0);

    // Apply the shift
    codePoint = (codePoint + shift) % 0x110000;  // Wrap around the entire Unicode range

    // Return the encrypted character using the shifted code point
    return String.fromCodePoint(codePoint);
  }

  /**
   * Return an string of ciphertext from plaintext
   * @param {String} plaintext 
   * @returns {String}
   */
  encipher(plaintext) {
    const key = parseInt(this.parameters.querySelector("#key").value);
    // return plaintext.replace(/[^A-Za-z]/gi, '').split("").map((char) => this.#encipherChar(char.toUpperCase(), key)).join("");
    return plaintext.split("").map((char) => this.#shiftChar(char, key)).join("");
  }

  /**
   * Return a string of plaintext from ciphertext
   * @param {String} ciphertext 
   * @returns {String}
   */
  decipher(ciphertext) {
    const key = parseInt(this.parameters.querySelector("#key").value);
    // return ciphertext.replace(/[^A-Za-z]/gi, '').split("").map((char) => this.#decipherChar(char.toUpperCase(), key)).join("");
    return ciphertext.split("").map((char) => this.#shiftChar(char, -key)).join("");
  }
}