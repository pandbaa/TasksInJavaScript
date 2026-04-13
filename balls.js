//Шарики разных цветов расположены в ряд.
//Когда образуется непрерывная цепочка из трех и более шариков одного цвета, она удаляется из линии.
//Все шарики при этом сдвигаются друг к другу, и ситуация может повториться.
//Необходимо понять, сколько шариков будет "уничтожено".

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  const arr = input.split(/\s+/).map(Number);
  const stack = [];
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (stack.length === 0) {
      stack.push([arr[i], 1]);
    } else if (stack[stack.length - 1][0] != arr[i]) {
      stack.push([arr[i], 1]);
    } else {
      stack[stack.length - 1][1]++;
    }
    if (
      stack[stack.length - 1][1] >= 3 &&
      arr[i + 1] != undefined &&
      arr[i + 1] != stack[stack.length - 1][0]
    ) {
      count += stack[stack.length - 1][1];
      stack.pop();
    }
  }
  while (stack.length != 0 && stack[stack.length - 1][1] >= 3) {
    count += stack[stack.length - 1][1];
    stack.pop();
  }
  console.log(count);
  rl.close();
});
