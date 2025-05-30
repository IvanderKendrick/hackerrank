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
 * Complete the 'circularArrayRotation' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER k
 *  3. INTEGER_ARRAY queries
 */

function circularArrayRotation(a, k, queries) {
  const n = a.length;
  const rotated = [];

  // Hitung rotasi efektif
  k = k % n;

  // Buat array hasil rotasi tanpa memodifikasi array asli
  for (let i = 0; i < n; i++) {
    rotated[(i + k) % n] = a[i];
  }

  // Ambil hasil dari setiap query
  const result = queries.map((q) => rotated[q]);
  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const k = parseInt(firstMultipleInput[1], 10);

  const q = parseInt(firstMultipleInput[2], 10);

  const a = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((aTemp) => parseInt(aTemp, 10));

  let queries = [];

  for (let i = 0; i < q; i++) {
    const queriesItem = parseInt(readLine().trim(), 10);
    queries.push(queriesItem);
  }

  const result = circularArrayRotation(a, k, queries);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
