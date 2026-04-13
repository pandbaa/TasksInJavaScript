//Мальчик хочет встать в любое место в очереди (как можно ближе к началу) так, чтобы ни у кого не превысился предел терпения
//cases - количество наборов входных данных
//т - количество человек в очереди, d - длиетльность заказа мальчика
//Далее описание каждого человека в очереди: время, которое он готов стоять в очереди (предел терпения) и время его заказа

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let f = 0,
  cases,
  n,
  d;
let countCase = 0;
let people = [];
let countPerson = 0;
rl.on("line", (input) => {
  if (f === 0) {
    cases = Number(input);
    f++;
    return;
  }
  if (f === 1) {
    [n, d] = input.split(" ").map(Number);
    countPerson = 0;
    f++;
    return;
  }
  if (f === 2) {
    const [t, k] = input.split(" ").map(Number);
    people.push([t, k]);
    countPerson++;
    if (countPerson === n) {
      console.log(solition(n, d, people));
      countCase++;
      f = 1;
      people = [];
      if (countCase === cases) {
        rl.close();
      }
    }
  }
});

function solition(n, d, people) {
  //console.log(n, d, people[0][1]);
  const prefix = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + people[i][1];
  }
  for (let i = n - 1; i >= 0; i--) {
    if (prefix[i] + d > people[i][0]) {
      return i + 2;
    }
  }
  return 1;
}
