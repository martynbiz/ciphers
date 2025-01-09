export default class ShiftCipher {
  
    description = `<p>TODO</p>`;
  
    parametersHTML = `<label for="key" class="form-label">Key</label>
      <input class="form-control" value="3" id="key" />`;

    // // TODO use this with regular expression valid chars
    // #alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(parameters) {
      this.parameters = parameters
    }
  
    /**
     * Return substitution character
     * @param {String} char 
     * @returns {String}
     */
    #encipherChar(char, key) {
      // console.log("=== encipherChar");
      // console.log(char.charCodeAt(0));
      // console.log(key);
      // console.log(char.charCodeAt(0) ^ key);
      
      
      return String.fromCharCode(char.charCodeAt(0) ^ key); //.charCodeAt(0)
    }
  
    /**
     * Return substitution character
     * @param {String} char 
     * @returns {String}
     */
    #decipherChar(char, key) {
      return String.fromCharCode(char.charCodeAt(0) ^ key);
    }
  
    /**
     * Return an string of ciphertext from plaintext
     * @param {String} plaintext 
     * @returns {String}
     */
    encipher(plaintext) {
      const key = parseInt(this.parameters.querySelector("#key").value)
      return plaintext.replace(/[^A-Za-z]/gi, '').split("").map((char) => this.#encipherChar(char.toUpperCase(), key)).join("");
    }
  
    /**
     * Return a string of plaintext from ciphertext
     * @param {String} ciphertext 
     * @returns {String}
     */
    decipher(ciphertext) {
      const key = parseInt(this.parameters.querySelector("#key").value)        
      return ciphertext.replace(/[^A-Za-z]/gi, '').split("").map((char) => this.#decipherChar(char.toUpperCase(), key)).join("");
    }
  }