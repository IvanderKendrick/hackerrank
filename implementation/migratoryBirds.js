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
 * Complete the 'migratoryBirds' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function migratoryBirds(arr) {
  // Objek untuk menyimpan jumlah kemunculan setiap ID burung
  let freq = {};

  // Menghitung frekuensi kemunculan setiap jenis burung
  arr.forEach((bird) => {
    freq[bird] = (freq[bird] || 0) + 1;
  });

  // Mengubah objek frekuensi menjadi array pasangan [id, jumlah]
  let entries = Object.entries(freq);

  // Mengurutkan berdasarkan jumlah kemunculan terbesar, lalu ID terkecil
  entries.sort((a, b) => b[1] - a[1] || a[0] - b[0]);

  // Mengembalikan ID burung yang paling sering muncul
  return parseInt(entries[0][0]);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const arrCount = parseInt(readLine().trim(), 10);

  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  const result = migratoryBirds(arr);

  ws.write(result + "\n");

  ws.end();
}
