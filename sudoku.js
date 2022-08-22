let puzzle = [
  ,
  ,
  ,
  ,
  4,
  2,
  ,
  5,
  ,
  ,
  ,
  4,
  ,
  ,
  6,
  ,
  ,
  ,
  5,
  ,
  8,
  ,
  ,
  ,
  ,
  ,
  9,
  1,
  ,
  6,
  2,
  ,
  ,
  ,
  3,
  ,
  ,
  ,
  5,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  3,
  6,
  7,
  ,
  2,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  8,
  ,
  ,
  ,
  ,
  1,
  2,
  ,
  6,
  4,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  5,
  7,
  ,
  ,
];
// let puzzle = [
//   ,
//   ,
//   7,
//   ,
//   8,
//   ,
//   ,
//   ,
//   2,
//   5,
//   ,
//   ,
//   ,
//   1,
//   ,
//   ,
//   3,
//   ,
//   ,
//   ,
//   1,
//   ,
//   ,
//   3,
//   6,
//   ,
//   7,
//   ,
//   ,
//   ,
//   1,
//   ,
//   ,
//   ,
//   8,
//   4,
//   ,
//   ,
//   ,
//   ,
//   ,
//   ,
//   ,
//   ,
//   ,
//   7,
//   8,
//   ,
//   ,
//   ,
//   2,
//   ,
//   ,
//   ,
//   6,
//   ,
//   8,
//   4,
//   ,
//   ,
//   2,
//   ,
//   ,
//   ,
//   9,
//   ,
//   ,
//   2,
//   ,
//   ,
//   ,
//   8,
//   2,
//   ,
//   ,
//   ,
//   9,
//   ,
//   5,
//   ,
//   ,
// ];

let blokjes = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80],
];

for (let i = 0; i < puzzle.length; i++) {
  if (puzzle[i] === undefined) {
    puzzle[i] = [];
    for (let number = 1; number <= 9; number++) {
      puzzle[i].push(number);
    }
  }
}

let tbodyRef = document.getElementById('myTable');

let index = 0;
for (let row = 1; row <= 9; row++) {
  let newRow = tbodyRef.insertRow();
  for (let column = 1; column <= 9; column++) {
    let newCell = newRow.insertCell();
    let newText = document.createTextNode('');
    if (puzzle[index] && !Array.isArray(puzzle[index])) {
      newText = document.createTextNode(puzzle[index]);
    }
    newCell.appendChild(newText);
    index++;
  }
}

// puzzle[0]
// getal 1
// zit 1 in de rij?
// zit 1 in de kolom?
// zit 1 in het 3 bij 3 vakje?
// indien 3x nee stop in array met mogelijke waarden
for (let loop = 0; loop < 100; loop++) {
  //chheck of getal in rij zit
  let row = 0;
  for (let i = 0; i < puzzle.length; i++) {
    if (50 === i) console.log(puzzle[i]);
    if (Array.isArray(puzzle[i])) {
      for (let j = 0; j < 9; j++) {
        if (puzzle[i] === puzzle[row * 9 + j]) {
          continue;
        }
        puzzle[i] = puzzle[i].filter((x) => {
          if (Array.isArray(puzzle[row * 9 + j]) && puzzle[row * 9 + j].length === 1) {
            return x !== puzzle[row * 9 + j][0];
          }
          return x !== puzzle[row * 9 + j];
        });
      }
    }
    if ((i + 1) % 9 === 0) {
      row++;
    }
  }
  //check of getal in kolom zit
  let column = 0;
  for (let i = 0; i < puzzle.length; i++) {
    if (50 === i) console.log(puzzle[i]);

    if (Array.isArray(puzzle[i])) {
      for (let j = 0; j < 81; j += 9) {
        if (puzzle[i] === puzzle[column + j]) {
          continue;
        }
        puzzle[i] = puzzle[i].filter((x) => {
          if (Array.isArray(puzzle[column + j]) && puzzle[column + j].length === 1) {
            return x !== puzzle[column + j][0];
          }
          return x !== puzzle[column + j];
        });
      }
    }
    column++;
    if (column == 9) {
      column = 0;
    }
  }
  //check of getal in blok zit
  let blokje = [];
  for (let i = 0; i < puzzle.length; i++) {
    if (50 === i) console.log(puzzle[i]);

    if (Array.isArray(puzzle[i]) && puzzle[i].length > 1) {
      for (let j = 0; j < blokjes.length; j++) {
        if (blokjes[j].includes(i)) {
          blokje = blokjes[j];
          break;
        }
      }
      for (let j = 0; j < blokje.length; j++) {
        if (50 === i) console.log('tada', puzzle[blokje[j]]);
        if (puzzle[i] === puzzle[blokje[j]]) {
          continue;
        }
        puzzle[i] = puzzle[i].filter((x) => {
          if (Array.isArray(puzzle[blokje[j]]) && puzzle[blokje[j]].length === 1) {
            return x != puzzle[blokje[j]][0];
          }

          return x != puzzle[blokje[j]];
        });
      }
    }
  }
  //check of ene mogelijkheid in blokje is
  let blok = [];

  for (let i = 0; i < puzzle.length; i++) {
    if (50 === i) console.log(puzzle[i]);

    if (Array.isArray(puzzle[i]) && puzzle[i].length > 1) {
      for (let j = 0; j < blokjes.length; j++) {
        if (blokjes[j].includes(i)) {
          blok = blokjes[j];
          break;
        }
      }
      // loop over elke mogelijkheid in de cell i
      let newArray = [];
      for (let j = 0; j < puzzle[i].length; j++) {
        if (puzzle[i].length === 1) {
          continue;
        }
        // loop over iedere cel in een blok
        let found = false;
        for (let k = 0; k < 9; k++) {
          if (blok[k] === i) {
            continue;
          }
          if (Array.isArray(puzzle[blok[k]])) {
            if (puzzle[blok[k]].includes(puzzle[i][j])) {
              found = true;
              break;
            }
          }
        }
        if (found === false) {
          newArray.push(puzzle[i][j]);
        }
      }
      if (newArray.length > 0) {
        puzzle[i] = newArray;
      }
    }
  }
  //kijken of getal maar 3 of 2 keer in blok voorkomt
  //kijken of getallen in dezelfde rij zitten
  //getal in de rest van de rij uitsluiten
  //check of getal in rij moet
  // blok = [];
  // for (let i = 0; i < puzzle.length; i++) {
  //   if (Array.isArray(puzzle[i]) && puzzle[i].length > 1) {
  //     for (let j = 0; j < blokjes.length; j++) {
  //       if (blokjes[j].includes(i)) {
  //         blok = blokjes[j];
  //         break;
  //       }
  //     }

  //     for (let j = 0; j < blok.length; j++) {
  //       for (let k = 0; k < blok[j].length; k++) {

  //       }
  //     }
  //   }
  // }
  console.log(JSON.stringify(puzzle));
}

let tbodyRefsol = document.getElementById('solutionTable');

let indexSol = 0;
for (let row = 1; row <= 9; row++) {
  let newRow = tbodyRefsol.insertRow();
  for (let column = 1; column <= 9; column++) {
    let newCell = newRow.insertCell();
    let newText = document.createTextNode('');
    if (puzzle[indexSol] && !Array.isArray(puzzle[indexSol])) {
      newText = document.createTextNode(puzzle[indexSol]);
    } else if (puzzle[indexSol] && puzzle[indexSol].length == 1) {
      newText = document.createTextNode(puzzle[indexSol][0]);
      newCell.className = 'solution';
    } else {
      newText = document.createTextNode(puzzle[indexSol].join(' '));
      newCell.className = 'pos';
    }
    newCell.appendChild(newText);
    indexSol++;
  }
}
console.log(puzzle);
