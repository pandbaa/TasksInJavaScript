//Выбрать любые три числа из массива с учётом повторений, которые удовлетворяют условию:
//максимальное из трёх чисел ≤ k × минимальное из трёх чисел

const { count } = require("console");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

let f = 0,
  n,
  k;
let cards = [],
  sum = 0;

rl.on("line", (input) => {
  if (f === 0) {
    [n, k] = input.split(/\s+/).map(Number);
    f++;
  } else {
    cards = input.split(/\s+/).map(Number);
    const numberOfOccurrences = {};
    for (let i = 0; i < n; i++) {
      numberOfOccurrences[cards[i]] = (numberOfOccurrences[cards[i]] ?? 0) + 1;
    }

    const keys = Object.keys(numberOfOccurrences);
    let duplicates = 0;
    let second = 0;
    for (let first = 0; first < keys.length; first++) {
      while (second < n && keys[first] * k >= keys[second]) {
        if (numberOfOccurrences[keys[second]] >= 2) {
          duplicates++;
        }
        second++;
      }

      const lenFirstSecond = second - first;
      //console.log(second, first);
      if (numberOfOccurrences[keys[first]] >= 2) {
        sum += (lenFirstSecond - 1) * 3;
      }
      if (numberOfOccurrences[keys[first]] >= 3) {
        sum += 1;
      }
      sum += ((lenFirstSecond - 1) * (lenFirstSecond - 2) * 6) / 2;
      if (numberOfOccurrences[keys[first]] >= 2) {
        duplicates--;
      }
      sum += duplicates * 3;
    }
    console.log(sum);
  }
});
