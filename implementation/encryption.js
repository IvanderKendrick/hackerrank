"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'encryption' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function encryption(s) {
  let l = s.length;
  let floor = Math.floor(Math.sqrt(l));
  let ceil = Math.ceil(Math.sqrt(l));

  if (floor * ceil < l) {
    floor++;
  }

  let regex = new RegExp(`.{1,${ceil}}`, "g");
  let result = s.match(regex);

  let answer = [];

  for (let i = 0; i < ceil; i++) {
    let sub = "";
    for (let j = 0; j < floor; j++) {
      if (result[j][i] != undefined) {
        sub += result[j][i];
      }
    }
    answer.push(sub);
  }

  return answer.join(" ");
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const result = encryption(s);

  ws.write(result + "\n");

  ws.end();
}
