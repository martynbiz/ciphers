const formatCiphertext = (input) => {
  // const blocks = input.match(/.{1,5}/g);
  // if (!blocks) return '';

  // let result = '';
  // for (let i = 0; i < blocks.length; i++) {
  //   result += blocks[i] + ' ';
  //   if ((i + 1) % 4 === 0) {
  //     result = result.trim() + '\n'; // Trim the space and add a newline after 4 blocks
  //   }
  // }

  // return result.trim(); // To remove the trailing space from the last block

  return input;
};

const formatPlaintext = (input) => {
  // return input.replace(/\s+/g, '');

  return input;
}

// behave like modular arithmetic, return non negative
const modular = (n, m) => {
  return ((n % m) + m) % m;
}

const modularInverse = (k, mod) => {
  let [a, m] = [k, mod];
  let [m0, x0, x1] = [m, 0, 1];

  if (m === 1) return 0;

  while (a > 1) {
      let q = Math.floor(a / m);
      [a, m] = [m, modular(a, m)];
      [x0, x1] = [x1 - q * x0, x0];
  }

  if (x1 < 0) x1 += m0;

  return x1;
}