//Найти площадь самого большого прямоугольника в гистограмме.
//Этот прямоугольник должен быть на общей базовой линии.

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function makeStackOfRecordsR(arr) {
  //поиск ближайшего меньшего справа
  const n = arr.length;
  const res = Array(n).fill(n);
  const stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && arr[i] < stack.at(-1)[0]) {
      res[stack.at(-1)[1]] = i;
      stack.pop();
    }
    stack.push([arr[i], i]);
  }
  return res;
}
function makeStackOfRecordsL(arr) {
  //поиск ближайшего меньшего слева
  const n = arr.length;
  const res = Array(n).fill(-1);
  const stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && arr[i] < stack.at(-1)[0]) {
      res[stack.at(-1)[1]] = i;
      stack.pop();
    }
    stack.push([arr[i], i]);
  }
  return res;
}

rl.on("line", (input) => {
  const [n, ...arr] = input.trim().split(/\s+/).map(Number);
  let mx = 0;
  const stackRight = makeStackOfRecordsR(arr);
  const stackLeft = makeStackOfRecordsL(arr);
  //console.log(stackLeft);
  //console.log(stackRight);
  for (let i = 0; i < n; i++) {
    const w = stackRight[i] - stackLeft[i] - 1;
    const s = w * arr[i];
    //console.log(i);
    mx = Math.max(s, mx);
  }
  console.log(mx);
  rl.close();
});
