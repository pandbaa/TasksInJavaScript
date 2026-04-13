//К тупику со стороны пути 1 подъехал поезд.
//Разрешается отцепить от поезда один или сразу несколько первых вагонов и завезти их в тупик.
//После этого часть из этих вагонов вывезти в сторону пути 2.
//После этого можно завезти в тупик еще несколько вагонов и снова часть оказавшихся вагонов вывезти в сторону пути 2. 
//Известен изначальный порядок вагонов в поезде, требуется определить, можно ли сделать так,
//чтобы вагоны оказались на пути 2 в правильном порядке

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
    const stack = [];
    let i = 0;
    let lastExit = 1;
    while (i < n) {
      while (arr[i] != lastExit && i < n) {
        stack.push(arr[i]);
        i++;
      }
      //console.log(stack);
      if (arr[i] === lastExit) {
        stack.push(arr[i]);
        stack.pop();
        //console.log('достал из стека ', stack.pop());
        i++;
        lastExit++;
      }
      while (stack[stack.length - 1] === lastExit) {
        stack.pop();
        lastExit++;
      }
    }
    let flag = false;
    while (stack.length != 0) {
      if (stack.pop() === lastExit) {
        lastExit++;
      } else {
        console.log("NO");
        flag = true;
        break;
      }
    }
    if (flag === false) {
      console.log("YES");
    }
    rl.close();
  }
});
