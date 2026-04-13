//Необходимо найти непустой отрезок массива с максимальной суммой

const { countReset } = require("console");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

let f = 0,
  n;
let arr = [];
rl.on("line", (input) => {
  if (input.trim() === "") return;
  if (f === 0) {
    f++;
    n = Number(input);
  } else {
    arr = input.split(/\s+/).map(Number);
    const prefix = Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
      prefix[i + 1] = prefix[i] + arr[i];
    }
    let mnL = 10 ** 9,
      res = -(10 ** 9);
    for (let r = 0; r < n + 1; r++) {
      res = Math.max(res, prefix[r] - mnL);
      mnL = Math.min(mnL, prefix[r]);
    }
    console.log(res);
    rl.close();
  }
});
