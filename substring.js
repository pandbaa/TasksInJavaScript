//Найти максимальную по длине подстроку данной строки, такую что каждый символ встречается в ней не более k раз

const { countReset } = require("console");
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
rl.on("line", (input) => {
  if (input.trim() === "") return;
  if (f === 0) {
    f++;
    [n, k] = input.split(/\s+/).map(Number);
  } else {
    let second = 0;
    const obj = {};
    let dl = 0,
      bestF = 0;
    obj[input[0]] = (obj[input[0]] ?? 0) + 1;
    let moreK = 0;
    for (const value of Object.values(obj)) {
      if (value > k) {
        moreK++;
      }
    }
    let flagPrint = false;
    if (n === 1 && k === 1) {
      console.log(1, 1);
      flagPrint = true;
      rl.close();
    }
    for (let first = 0; first < n - 1; first++) {
      //console.log("для first", first);
      //console.log("объект до while", obj);
      while (second + 1 < n && moreK === 0) {
        second++;
        obj[input[second]] = (obj[input[second]] ?? 0) + 1;
        if (obj[input[second]] === k + 1) {
          moreK++;
        }
        //console.log("я перебирал second", second);
        //console.log(obj, moreK);
      }
      if (moreK != 0) {
        if (second - 1 - first + 1 >= dl) {
          dl = second - 1 - first + 1;
          bestF = first;
          //console.log("было обновление, потому что испортился объект", dl, bestF);
          //console.log("first и second для обновления", first, second - 1);
        }
      } else if (second + 1 >= n) {
        if (second - first + 1 >= dl) {
          dl = second - first + 1;
          bestF = first;
          /* console.log(
          "было обновление, потому что second вываливается из массива",
          dl,
          bestF,
        ); */
          //console.log("first и second для обновления", first, second);
          break;
        }
      }
      obj[input[first]] = obj[input[first]] - 1;
      if (obj[input[first]] === k) {
        moreK--;
      }
    }
    if (!flagPrint) {
      console.log(dl, bestF + 1);
      rl.close();
    }
  }
});
