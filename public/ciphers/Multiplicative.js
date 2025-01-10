export default class MultiplicativeCipher extends EventTarget {

  #descriptionHTML = `<p>A multiplicative cipher is a type of <a href="https://en.wikipedia.org/wiki/Substitution_cipher">substitution cipher</a> where each letter in the plaintext is multiplied by a fixed number (the key) modulo 26 to produce the ciphertext.</p>
    <p>C = (P x k) mod 26<p></p>P = (C x k<sup>-1</sup>) mod 26<p></p>P is the plaintext letter after decryption; C is the ciphertext letter (converted to its numerical equivalent); k is the key; 26 ensures the result stays within the range of 0 to 25 (the alphabet)</p>
    <p>This cipher also has 'bad keys,' which are any multiples of the prime factors of the total number of characters (e.g. 2, 4, 6, 13, 26). Using these keys will make it impossible to decipher the ciphertext.</p>
    <p><a href="https://www.khanacademy.org/math/algebra">https://www.khanacademy.org/math/algebra</a><br>
    <a href="https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/what-is-modular-arithmetic">https://www.khanacademy.org/.../what-is-modular-arithmetic</a></p>`;

  #parametersHTML = `<label for="key" class="form-label">Key</label>
    <input class="form-control" value="3" id="key" />`;

  constructor(parameters) {
    super();
    this.parameters = parameters
  }

  init(descriptionContainer, paramtersContainer) {
    descriptionContainer.innerHTML = this.#descriptionHTML;
    paramtersContainer.innerHTML = this.#parametersHTML;

    // Attach input listener
    document.getElementById("key").addEventListener("input", (e) => {
      const data = { value: e.target.value }; // Example data to send with the event
      const event = new CustomEvent('change_parameters', { detail: data });
      this.dispatchEvent(event); // Dispatch the event
    });
  }

  // Private method for encryption using the multiplicative cipher
  #multiplicativeCipherEncrypt(character, key) {
    // Get the Unicode code point of the character
    let codePoint = character.codePointAt(0);

    // Apply multiplicative cipher (multiply by the key and wrap around using mod)
    codePoint = modular(codePoint * key, 0x110000) || 0;  // Wrap around the entire Unicode range (0 to 0x10FFFF)

    // Return the encrypted character as a string
    return String.fromCodePoint(codePoint);
  }

  // Private method for decryption using the multiplicative cipher and modular inverse
  #multiplicativeCipherDecrypt(character, key) {
    // Get the modular inverse of the key
    const modInverseKey = modularInverse(key, 0x110000) || 0;  // Find the modular inverse modulo the Unicode range

    if (modInverseKey === -1) {
      throw new Error('Modular inverse does not exist for this key.');
    }

    // Get the Unicode code point of the character
    let codePoint = character.codePointAt(0);

    // Apply the inverse multiplicative cipher (multiply by the inverse key and wrap around)
    codePoint = modular(codePoint * modInverseKey, 0x110000);  // Wrap around the entire Unicode range (0 to 0x10FFFF)

    // Return the decrypted character as a string
    return String.fromCodePoint(codePoint);
  }

  /**
   * Return a string of ciphertext from plaintext
   * @param {String} plaintext 
   * @returns {String}
   */
  encipher(plaintext) {
    const key = parseInt(this.parameters.querySelector("#key").value);  // Get the key from the query parameter
    return plaintext.split("").map((char) => this.#multiplicativeCipherEncrypt(char, key)).join("");  // Encrypt each character
  }

  /**
   * Return a string of plaintext from ciphertext
   * @param {String} ciphertext 
   * @returns {String}
   */
  decipher(ciphertext) {
    const key = parseInt(this.parameters.querySelector("#key").value);  // Get the key from the query parameter
    return ciphertext.split("").map((char) => this.#multiplicativeCipherDecrypt(char, key)).join("");  // Decrypt each character
  }
}