export default class EnigmaMachine extends EventTarget {

  #descriptionHTML = `<p>The Enigma machine was a sophisticated encryption device used primarily by Nazi Germany during World War II to secure military communications. It employed a system of rotors and plugboards to generate complex polyalphabetic ciphers, making it one of the most advanced mechanical cipher systems of its time. Despite its perceived invulnerability, the machine's codes were famously broken by Allied cryptographers, significantly influencing the outcome of the war.</p>
  <p>TODO</p>`;

  #parametersHTML = `<label for="rotor1" class="form-label">Rotor #1 start</label>
    <input class="form-control" value="0" id="rotor1" />
    <label for="rotor2" class="form-label">Rotor #2 start</label>
    <input class="form-control" value="0" id="rotor2" />
    <label for="rotor3" class="form-label">Rotor #3 start</label>
    <input class="form-control" value="0" id="rotor3" />
    <label for="plugboard" class="form-label">Plugboard</label>
    <input class="form-control" value="ab cd ef" id="plugboard" />`;

  constructor(parameters) {
    super();
    this.parameters = parameters;
    this.rotors = [
      "EKMFLGDQVZNTOWYHXUSPAIBRCJ", // Rotor I
      "AJDKSIRUXBLHWTMCQGZNPYFVOE", // Rotor II
      "BDFHJLCPRTXVZNYEIWGAKMUSQO"  // Rotor III
    ];
    this.reflector = "YRUHQSLDPXNGOKMIEBFZCWVJAT"; // Reflector B
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
    document.getElementById("rotor1").addEventListener("input", emitChange);
    document.getElementById("rotor2").addEventListener("input", emitChange);
    document.getElementById("rotor3").addEventListener("input", emitChange);
    document.getElementById("plugboard").addEventListener("input", emitChange);
  }

  /**
   * Substitute a character using the plugboard mapping.
   * @param {String} char - The character to substitute.
   * @param {String} plugboard - Plugboard mappings in "AB CD EF" format.
   * @returns {String} - The substituted character.
   */
  #applyPlugboard(char, plugboard) {
    const swaps = plugboard.split(" ").map(pair => pair.split(""));
    for (const [a, b] of swaps) {
      if (char === a) return b;
      if (char === b) return a;
    }
    return char;
  }

  /**
   * Perform a forward substitution through the rotors.
   * @param {String} char - The character to encipher.
   * @param {Array} rotorPositions - The positions of the rotors.
   * @returns {String} - The substituted character.
   */
  #encipherChar(char, rotorPositions) {
    const { rotors, reflector, alphabet } = this;

    // Pass through plugboard
    const plugboard = this.parameters.querySelector("#plugboard").value;
    char = this.#applyPlugboard(char, plugboard);

    // Forward through rotors
    for (let i = 0; i < rotors.length; i++) {
      const position = rotorPositions[i];
      const index = (alphabet.indexOf(char) + position) % 26;
      char = rotors[i][index];
    }

    // Reflector
    char = reflector[alphabet.indexOf(char)];

    // Backward through rotors (reverse order)
    for (let i = rotors.length - 1; i >= 0; i--) {
      const position = rotorPositions[i];
      const index = (rotors[i].indexOf(char) - position + 26) % 26;
      char = alphabet[index];
    }

    // Pass through plugboard again
    char = this.#applyPlugboard(char, plugboard);

    return char;
  }

  /**
   * Perform a backward substitution through the rotors.
   * In Enigma, enciphering and deciphering use the same process.
   * @param {String} char - The character to decipher.
   * @param {Array} rotorPositions - The positions of the rotors.
   * @returns {String} - The deciphered character.
   */
  #decipherChar(char, rotorPositions) {
    // Deciphering in Enigma is symmetric to enciphering.
    return this.#encipherChar(char, rotorPositions);
  }

  /**
   * Advance the rotor positions, simulating Enigma's stepping mechanism.
   * @param {Array} rotorPositions - The positions of the rotors.
   */
  #advanceRotors(rotorPositions) {
    rotorPositions[0] = (rotorPositions[0] + 1) % 26;
    if (rotorPositions[0] === 0) {
      rotorPositions[1] = (rotorPositions[1] + 1) % 26;
      if (rotorPositions[1] === 0) {
        rotorPositions[2] = (rotorPositions[2] + 1) % 26;
      }
    }
  }

  /**
   * Encipher a string of plaintext.
   * @param {String} plaintext - The plaintext to encipher.
   * @returns {String} - The resulting ciphertext.
   */
  encipher(plaintext) {
    const rotor1 = parseInt(this.parameters.querySelector("#rotor1").value, 10);
    const rotor2 = parseInt(this.parameters.querySelector("#rotor2").value, 10);
    const rotor3 = parseInt(this.parameters.querySelector("#rotor3").value, 10);
    const rotorPositions = [rotor1, rotor2, rotor3];

    return plaintext
      .replace(/[^A-Za-z]/g, "")
      .toUpperCase()
      .split("")
      .map(char => {
        const encipheredChar = this.#encipherChar(char, rotorPositions);
        this.#advanceRotors(rotorPositions);
        return encipheredChar;
      })
      .join("");
  }

  /**
   * Decipher a string of ciphertext.
   * @param {String} ciphertext - The ciphertext to decipher.
   * @returns {String} - The resulting plaintext.
   */
  decipher(ciphertext) {
    const rotor1 = parseInt(this.parameters.querySelector("#rotor1").value, 10);
    const rotor2 = parseInt(this.parameters.querySelector("#rotor2").value, 10);
    const rotor3 = parseInt(this.parameters.querySelector("#rotor3").value, 10);
    const rotorPositions = [rotor1, rotor2, rotor3];

    return ciphertext
      .replace(/[^A-Za-z]/g, "")
      .toUpperCase()
      .split("")
      .map(char => {
        const decipheredChar = this.#decipherChar(char, rotorPositions);
        this.#advanceRotors(rotorPositions);
        return decipheredChar;
      })
      .join("");
  }

}
