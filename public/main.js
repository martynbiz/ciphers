window.addEventListener('DOMContentLoaded',function () {

  const selectCipher = document.getElementById('select_cipher');
  // const key = document.getElementById('inputKey');

  const parameters = this.document.getElementById("parameters");

  const defaultDesc = document.getElementById("default_desc");
  const desc = document.getElementById('desc');

  const errorDiv = document.getElementById('error');

  const inputPlaintext = document.getElementById('input_plaintext');
  const outputCiphertext = document.getElementById('output_ciphertext');
  const inputCiphertext = document.getElementById('input_ciphertext');
  const outputPlaintext = document.getElementById('output_plaintext');

  // const ciphers = {
  //   "shift": new ShiftCipher(),
  //   "multiplicative": new MultiplicativeCipher(),
  // };

  const encipherPlaintextField = () => {    
    if (loadedCipher) {
      let ciphertext = loadedCipher.encipher(inputPlaintext.value);
      outputCiphertext.value = formatCiphertext(ciphertext);
    } else {
      outputCiphertext.value = ""
    }
  }

  const decipherCiphertextField = () => {
    if (loadedCipher) {
      let plaintext = loadedCipher.decipher(inputCiphertext.value);      
      outputPlaintext.value = formatPlaintext(plaintext);
    } else {
      outputPlaintext.value = ""
    }
  }

  const showError = (error) => {
    errorDiv.innerHTML = error
    errorDiv.style.display = 'block';
    console.error(error);
  }

  const copyTextareaToClipboard = (textarea) => {
    textarea.select();
    document.execCommand('copy');
    alert('Text copied to clipboard!');
  }

  const updateCipherInfoFromSelect = async (path) => {

    // const path = e.target.value
    errorDiv.style.display = 'none';
    
    if (path) {
      try {    
        const { default: ModuleClass } = await import(path);
        loadedCipher = new ModuleClass(parameters);
      } catch (error) {
        loadedCipher = null;
        desc.innerHTML = ""
        showError(error);
      }
    } else {
      loadedCipher = null;
      desc.innerHTML = ""
    }
    
    parameters.innerHTML = loadedCipher ? loadedCipher.parametersHTML : "";

    // TODO added event listeners to parameter fields too on change

    // inputPlaintext.readOnly = !loadedCipher
    // inputCiphertext.readOnly = !loadedCipher
    defaultDesc.style.display = !loadedCipher ? 'block' : 'none';
    
    desc.innerHTML = loadedCipher.description;

    encipherPlaintextField();
    decipherCiphertextField();
  }
  
  let loadedCipher;
  
  selectCipher.addEventListener('change', async (e) => {
    updateCipherInfoFromSelect(e.target.value);
  });
  
  inputPlaintext.addEventListener('keyup', (e) => {
    encipherPlaintextField();
  }, false);
  
  inputCiphertext.addEventListener('keyup', (e) => {
    decipherCiphertextField();
  }, false);

  document.getElementById('copyCiphertext').addEventListener('click', function(e) {
    const textarea = document.getElementById('output_ciphertext');
    copyTextareaToClipboard(textarea);
    e.preventDefault();
  });

  document.getElementById('copyPlaintext').addEventListener('click', function(e) {
    const textarea = document.getElementById('output_plaintext');
    copyTextareaToClipboard(textarea);
    e.preventDefault();
  });

  updateCipherInfoFromSelect(selectCipher.value);

});