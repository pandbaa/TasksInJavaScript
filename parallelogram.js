//По координатам точек необходимо определить, являются ли они вершинами параллелограмма. Пары точек заданы в произвольном порядке
//n - количество наборов координат

const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let flag = 0,
  n;
const arr = [];
const res = [];
rl.on("line", (input) => {
  if (flag === 0) {
    n = Number(input);
    flag++;
  } else {
    arr.push(input);
  }
});

rl.on("close", () => {
  for (let i = 0; i < n; i++) {
    const [x1, y1, x2, y2, x3, y3, x4, y4] = arr[i].split(/\s+/).map(Number);
    //вар1
    const equality1 =
      Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) ===
      Math.sqrt((x3 - x4) ** 2 + (y3 - y4) ** 2);
    const k11 = x2 - x1 === 0 ? 0 : (y2 - y1) / (x2 - x1);
    const k12 = x3 - x4 === 0 ? 0 : (y3 - y4) / (x3 - x4);
    //вар2
    const equality2 =
      Math.sqrt((x1 - x3) ** 2 + (y3 - y1) ** 2) ===
      Math.sqrt((x2 - x4) ** 2 + (y2 - y4) ** 2);
    const k21 = x3 - x1 === 0 ? 0 : (y3 - y1) / (x3 - x1);
    const k22 = x2 - x4 === 0 ? 0 : (y2 - y4) / (x2 - x4);
    //вар3
    const equality3 =
      Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) ===
      Math.sqrt((x3 - x4) ** 2 + (y3 - y4) ** 2);
    const k31 = x2 - x1 === 0 ? 0 : (y2 - y1) / (x2 - x1);
    const k32 = x3 - x4 === 0 ? 0 : (y3 - y4) / (x3 - x4);
    if (
      (equality1 && k11 === k12) ||
      (equality2 && k21 === k22) ||
      (equality3 && k31 === k32)
    ) {
      res.push("YES");
    } else {
      res.push("NO");
    }
  }
  fs.writeFileSync("output.txt", res.join("\n"));
});
