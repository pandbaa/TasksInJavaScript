//Есть n слов одинаковой длины. Найти максимальное k,
//чтобы можно было разбить слова на пары так, чтобы у каждой пары слов совпадало хотя бы k первых букв.

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let f = -1,
  n,
  strs = [],
  minLen = 2 * 10 ** 6;
rl.on("line", (input) => {
  if (f === -1) {
    n = Number(input);
    f++;
  } else {
    strs.push(input);
    minLen = Math.min(minLen, input.length);
  }
});

rl.on("close", () => {
  let res = 10 ** 10;
  const strs2 = strs.sort();
  let i = 0;
  while (i < strs2.length) {
    let k1 = 0;
    for (let k = strs2[i].length; k >= 0; k--) {
      if (strs2[i].slice(0, k) === strs2[i + 1].slice(0, k)) {
        k1 = k;
        break;
      }
    }
    res = Math.min(res, k1);
    i = i + 2;
  }
  console.log(res);
});


