//Необходимо рассадить n студентов по рядам
//В любых двух рядах число студентов должно отличатся не более чем на 1
//Если есть ряды с разным количеством студентов, то количество студентов в любых двух соседних рядах различно

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  const n = Number(input);
  let best = 10 ** 12;
  for (let row = 1; row < 2 * Math.sqrt(n); row++) {
    let student;
    if (n % row === 0) {
      student = n / row;
      best = Math.min(best, Math.abs(row - student));
    } else {
      student = Math.floor(n / row);
      const ost = n - student * row;
      if (Math.floor(row / 2) === ost || Math.ceil(row / 2) === ost) {
        best = Math.min(best, Math.abs(row - (student + 1)));
      }
    }
  }
  console.log(best);
  rl.close();
});
