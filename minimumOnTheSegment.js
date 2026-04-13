//По последовательности длины n двигается окно длины k.
//Требуется для каждого положения окна определить минимум в нём.

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let f = 0;
let n, k;
rl.on("line", (input) => {
  if (f === 0) {
    f++;
    [n, k] = input.split(" ").map(Number);
  } else {
    const arr = input.split(" ").map(Number);
    const deque = Array(20000).fill("*");
    let dequeBegin = 0,
      dequeEnd = 0;
    for (let i = 0; i < k; i++) {
      if (dequeBegin === 0 && dequeEnd === 0) {
        deque[dequeEnd] = arr[i];
        dequeEnd++;
      } else {
        while (deque[dequeEnd - 1] > arr[i]) {
          deque[dequeEnd - 1] = "*";
          dequeEnd--;
        }
        deque[dequeEnd] = arr[i];
        dequeEnd++;
      }
    }
    console.log(deque[dequeBegin]);
    for (let i = k; i < n; i++) {
      if (arr[i - k] === deque[dequeBegin]) {
        deque[dequeBegin] = "*";
        dequeBegin++;
      }
      while (deque[dequeEnd - 1] > arr[i]) {
        deque[dequeEnd - 1] = "*";
        dequeEnd--;
      }
      deque[dequeEnd] = arr[i];
      dequeEnd++;
      //console.log(deque);
      console.log(deque[dequeBegin]);
    }
    rl.close();
  }
});
