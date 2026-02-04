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
 * Complete the 'minimumDistances' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function minimumDistances(a) {
  const lastIndex = new Map();
  let minDistance = Infinity;

  for (let i = 0; i < a.length; i++) {
    if (lastIndex.has(a[i])) {
      minDistance = Math.min(minDistance, i - lastIndex.get(a[i]));
    }
    lastIndex.set(a[i], i);
  }

  return minDistance === Infinity ? -1 : minDistance;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const a = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((aTemp) => parseInt(aTemp, 10));

  const result = minimumDistances(a);

  ws.write(result + "\n");

  ws.end();
}
