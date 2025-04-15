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
 * Complete the 'formingMagicSquare' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY s as parameter.
 */

// function formingMagicSquare(s) {
//     // Write your code here
//     let map = {};

//     let totalInDia = 0;

//     for (let i = 0; i < s.length; i++) {
//         let totalInRow = s[i].reduce((total, num) => total = total+num, 0);

//         let totalInCol = 0;
//         for (let j = 0; j < s.length; j++) {

//             if (i === j) {
//                 totalInDia += s[i][j];
//             }

//             totalInCol += s[j][i];
//         }

//         map[totalInRow] = (map[totalInRow] || 0) + 1;
//         map[totalInCol] = (map[totalInCol] || 0) + 1;
//     }

//     map[totalInDia] = (map[totalInDia] || 0) + 1;
//     let totalInDiaAbnormal = s[0][2] + s[1][1] + s[2][0];
//     map[totalInDiaAbnormal] = (map[totalInDiaAbnormal] || 0) + 1;

//     // Finding number with highest frequency
//     const theNumber = Object.entries(map).reduce(
//         (max, [key, value]) =>
//         value > max.value ? {key, value} : max,
//         {key : null, value : 0}
//     ).key

//     console.log(map);

//     // SALAH START!
//     let answer = 0;
//     for (let i = 0; i < s.length; i++) {
//         let totalInRow = s[i].reduce((total, num) => total = total+num, 0);

//         if (totalInRow != theNumber) {
//             answer += Math.abs(totalInRow - theNumber);
//         }
//     }

//     return answer;
//     // SALAH END!
// }

function formingMagicSquare(s) {
  // Semua kemungkinan magic square 3x3 yang valid
  const magicSquares = [
    [
      [8, 1, 6],
      [3, 5, 7],
      [4, 9, 2],
    ],
    [
      [6, 1, 8],
      [7, 5, 3],
      [2, 9, 4],
    ],
    [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6],
    ],
    [
      [2, 9, 4],
      [7, 5, 3],
      [6, 1, 8],
    ],
    [
      [8, 3, 4],
      [1, 5, 9],
      [6, 7, 2],
    ],
    [
      [4, 3, 8],
      [9, 5, 1],
      [2, 7, 6],
    ],
    [
      [6, 7, 2],
      [1, 5, 9],
      [8, 3, 4],
    ],
    [
      [2, 7, 6],
      [9, 5, 1],
      [4, 3, 8],
    ],
  ];

  let minCost = Infinity;

  // Cek setiap kemungkinan magic square dan hitung biaya perubahan
  for (const magic of magicSquares) {
    let cost = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        cost += Math.abs(s[i][j] - magic[i][j]);
      }
    }

    minCost = Math.min(minCost, cost);
  }

  return minCost;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  let s = Array(3);

  for (let i = 0; i < 3; i++) {
    s[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((sTemp) => parseInt(sTemp, 10));
  }

  const result = formingMagicSquare(s);

  ws.write(result + "\n");

  ws.end();
}
