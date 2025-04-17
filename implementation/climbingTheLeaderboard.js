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
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

// function climbingLeaderboard(ranked, player) {
//     // Write your code here
//     let final = [];

//     player.forEach((item) => {
//         let gabungan = ranked.concat(item);

//         let answer = new Set(gabungan);

//         const result = [...answer];
//         result.sort((a,b)=>b-a);

//         final.push(result.indexOf(item)+1);
//     })

//     return final;
// }

function climbingLeaderboard(ranked, player) {
  // 1. Hilangkan duplikat dan urutkan sekali (descending)
  let uniqueRanks = [...new Set(ranked)];

  // 2. Array untuk menyimpan hasil peringkat
  let result = [];

  // 3. Pointer untuk binary search (mulai dari peringkat terendah)
  let index = uniqueRanks.length - 1;

  // 4. Iterasi setiap skor player
  player.forEach((score) => {
    // Gunakan binary search secara manual (turun peringkat jika perlu)
    while (index >= 0 && score >= uniqueRanks[index]) {
      index--; // Turun ke peringkat yang lebih tinggi
    }

    // Tambahkan hasil peringkat (index + 2 karena zero-based index)
    result.push(index + 2);
  });

  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const rankedCount = parseInt(readLine().trim(), 10);

  const ranked = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((rankedTemp) => parseInt(rankedTemp, 10));

  const playerCount = parseInt(readLine().trim(), 10);

  const player = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((playerTemp) => parseInt(playerTemp, 10));

  const result = climbingLeaderboard(ranked, player);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
