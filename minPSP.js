//Символы ’[’, ’]’, ’(’ и ’)’ некоторым образом упорядочены.
//Рассмотрим все ПСП длины n состоящие из круглых и квадратных скобок и начинающиеся со строки s.
//Среди этих ПСП необходимо найти лексикографически минимальную.

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let f = 0;
let w, s, res;
//arr = input.split(/\s+/).map(Number);
rl.on("line", (input) => {
  if (f === 0) {
    n = Number(input);
    f++;
  } else if (f === 1) {
    w = input;
    f++;
  } else if (f === 2) {
    f++;
    s = input;
    res = s;
    const stack = [];
    let del = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "(" || s[i] === "[") {
        stack.push(s[i]);
      } else if (
        (s[i] === ")" && stack.at(-1) === "(" && stack.length != 0) ||
        (s[i] === "]" && stack.at(-1) === "[" && stack.length != 0)
      ) {
        stack.pop();
        del += 2;
      }
    }
    if (del === n) {
      console.log(res);
    } else {
      let freeSeats = n - (stack.length + del);
      const len = stack.length;
      let count = 0;
      for (let i = 0; i < freeSeats; i++) {
        for (let j = 0; j < 4; j++) {
          //console.log(j);
          if (
            (w[j] === "(" || w[j] === "[") &&
            len * 2 + count + 2 + del <= n
          ) {
            stack.push(w[j]);
            res += w[j];
            count += 2;
            break;
          } else if (
            (w[j] === "]" && stack.at(-1) === "[") ||
            (w[j] === ")" && stack.at(-1) === "(" && stack.length != 0)
          ) {
            stack.pop();
            res += w[j];
            break;
          }
        }
      }
      console.log(res);
    }
  }
});
