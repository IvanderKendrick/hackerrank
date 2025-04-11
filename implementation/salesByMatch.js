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
 * Complete the 'sockMerchant' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER_ARRAY ar
 */

// function sockMerchant(n, ar) {
//     // Write your code here
//     let totalPairs = 0;
//     for (let i = 0; i < n; i++) {
//         let isThere = ar.indexOf(ar[i], i+1)
//         if (isThere != -1) {
//             ar.splice(isThere, 1);
//             totalPairs++;
//         }
//     }

//     return totalPairs;
// }

function sockMerchant(n, ar) {
  let count = {}; // Hash Map untuk menyimpan jumlah setiap warna
  let totalPairs = 0;

  // Hitung frekuensi setiap warna kaos kaki
  for (let sock of ar) {
    count[sock] = (count[sock] || 0) + 1;
  }

  // Hitung jumlah pasangan kaos kaki
  for (let key in count) {
    totalPairs += Math.floor(count[key] / 2);
  }

  return totalPairs;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const ar = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arTemp) => parseInt(arTemp, 10));

  const result = sockMerchant(n, ar);

  ws.write(result + "\n");

  ws.end();
}
