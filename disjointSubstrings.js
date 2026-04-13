//Дана строка s. Необходимо найти в ней подстроку макимальной длины,
//у которой существует максимальное количество непересекающихся вхождений в строку s.

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

//arr = input.split(/\s+/).map(Number);
rl.on("line", (input) => {
  const obj = {};
  for (let i = 0; i < input.length; i++) {
    if (obj[input[i]] === undefined) {
      obj[input[i]] = [];
    }
    obj[input[i]].push(i);
  }
  const obj2 = {};
  for (const [key, value] of Object.entries(obj)) {
    const diff = [0];
    for (let i = 1; i < value.length; i++) {
      diff.push(value[i] - value[i - 1]);
    }
    if (obj2[key] === undefined) {
      obj2[key] = [];
    }
    obj2[key].push(value.length);
    obj2[key].push(value[0]);
    obj2[key].push(diff);
  }
  //console.log(obj2);
  const entries = Object.entries(obj2);
  //console.log(entries);
  entries.sort((a, b) => a[1][1] - b[1][1]);
  let count=1, mx=1;
  //const sortedObj2 = Object.fromEntries(entries);
  for (let i=1;i<entries.length;i++) {
    const prevLen=entries[i-1][1][0];
    const prevDiff=entries[i-1][1][2];
    const prevPos=entries[i-1][1][1];
    const nowLen=entries[i][1][0];
    const nowDiff=entries[i][1][2];
    const nowPos=entries[i][1][1];
    if (prevLen===nowLen && prevPos+1===nowPos && arraysEqual(nowDiff, prevDiff)) {
      count++;
    } else {
      count=1;
    }
    mx=Math.max(mx, count);
  }
  console.log(mx);
  rl.close();
});