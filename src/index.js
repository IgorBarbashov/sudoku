// module.exports =
function solveSudoku(matrix) {
  const gCopy = matrix => matrix.map(el => [...el]);
  const gR = (matrix, i) => matrix[i];
  const gC = (matrix, i) => matrix.map(el => el[i]);
  const gSbN = (matrix, i) =>
    matrix
      .filter((el, ind) => {
        const k = Math.floor((i - 1) / 3);
        return k * 3 <= ind && ind < (k + 1) * 3;
      })
      .map(el => {
        const ost = (i % 3) - 1;
        const ind = ost < 0 ? 6 : ost * 3;
        return el.slice(ind, ind + 3);
      })
      .reduce((acc, el) => [...acc, ...el], []);
  const gS = (matrix, r, c) => {
    const sN = Math.floor(r / 3) * 3 + Math.floor(c / 3) + 1;
    return gSbN(matrix, sN);
  };
  const cnR = (matrix, i, number) => gR(matrix, i).includes(number);
  const cnC = (matrix, i, number) => gC(matrix, i).includes(number);
  const cnS = (matrix, r, c, number) => gS(matrix, r, c).includes(number);

  // for (let i = 0; i < 9; i++) {
  //   console.log(`row - ${i}`);
  //   for (let j = 0; j < 9; j++) {
  //     console.log(`r${i} - c${j}: ${gS(matrix, i, j)}`);
  //   }
  // }

  // console.log(gS(matrix, 2, 2));
}

// example
const initial = [
  [5, 3, 4, 6, 7, 8, 9, 0, 0],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

solveSudoku(initial);
