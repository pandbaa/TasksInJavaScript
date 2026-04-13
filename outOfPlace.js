//В ресторан пришли n гостей и сели за круглый стол. Стол вращается в одну сторону
//У всех гостей, кроме первого, при повороте окажется блюдо, ранее стоявшее у гостя с номером на один меньше.
//У первого гостя окажется блюдо, стоявшее ранее у последнего гостя
//У i-го гостя аллергия на блюдо с номером i. Изначально шеф-повар подготовил для i-го гостя блюдо с номером ai
//Необходимо найти минимальное количество операций необходимое для того, чтобы ни один гость не получил блюда, на которое у него аллергия

const { countReset } = require("console");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

//arr = input.split(/\s+/).map(Number);
let f = 0;
rl.on("line", (input) => {
  if (f === 0) {
    f++;
    n = Number(input);
  } else {
    const arr = input.split(/\s+/).map(Number);
    const turn = Array(n).fill(true);
    for (let i = 0; i < n; i++) {
      if (i + 1 <= arr[i]) {
        const trn = arr[i] - (i + 1);
        turn[trn] = false;
      } else {
        const trn = i + 1 - arr[i];
        turn[n - trn] = false;
      }
    }
    let flag = false;
    for (let i = 0; i < n; i++) {
      if (turn[i] === true) {
        console.log(i);
        flag = true;
        break;
      }
    }
    if (flag === false) {
      console.log("-1");
    }
    rl.close();
  }
});
