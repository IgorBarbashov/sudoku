module.exports = function solveSudoku(matrix) {
  const valuesOfUnsolved = [];
  const indexes = getIndexesOfUnsolved(matrix);
  for (const i of indexes) {
    const [row, col] = convertIndexToRowCol(i);
    valuesOfUnsolved.push([i, getPossibleValues(matrix, row, col)]);
  }

  const solve = (matrix, unsolveds) => {
    if (unsolveds.length === 0) {
      return matrix;
    }
    if (unsolveds[0][1].length === 0) {
      return false;
    }

    const newMatrix = gCopy(matrix);
    const newUnsolveds = gCopyUnsolved(unsolveds);
    const currentUnsolved = newUnsolveds.shift();
    const [row, col] = convertIndexToRowCol(currentUnsolved[0]);

    for (const i of currentUnsolved[1]) {
      if (!cCell(newMatrix, row, col, i)) {
        continue;
      }
      newMatrix[row][col] = i;
      const result = solve(newMatrix, newUnsolveds);
      if (result) {
        return result;
      }
    }
    return false;
  };

  return solve(matrix, valuesOfUnsolved);
};

function gCopy(matrix) {
  return matrix.map(el => [...el]);
}

function gCopyUnsolved(unsolved) {
  return unsolved.map(el => [el[0], [...el[1]]]);
}

function gR(matrix, i) {
  return matrix[i];
}

function gC(matrix, i) {
  return matrix.map(el => el[i]);
}

function gSbN(matrix, i) {
  return matrix
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
}

function gS(matrix, r, c) {
  const sN = Math.floor(r / 3) * 3 + Math.floor(c / 3) + 1;
  return gSbN(matrix, sN);
}

function cnR(matrix, i, number) {
  return gR(matrix, i).includes(number);
}

function cnC(matrix, i, number) {
  return gC(matrix, i).includes(number);
}

function cnS(matrix, r, c, number) {
  return gS(matrix, r, c).includes(number);
}

function cCell(matrix, r, c, number) {
  const isInRow = cnR(matrix, r, number);
  const isInCol = cnC(matrix, c, number);
  const isInSector = cnS(matrix, r, c, number);
  return !isInRow && !isInCol && !isInSector;
}

function getIndexesOfUnsolved(matrix) {
  return matrix.reduce((acc, el, row) => {
    const inRow = el.reduce((acc, el, col) => {
      return el === 0 ? [...acc, row * 9 + col] : acc;
    }, []);
    return [...acc, ...inRow];
  }, []);
}

function getPossibleValues(matrix, r, c) {
  const base = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const row = gR(matrix, r);
  const col = gC(matrix, c);
  const sector = gS(matrix, r, c);
  return base.filter(
    el => !row.includes(el) && !col.includes(el) && !sector.includes(el)
  );
}

function convertIndexToRowCol(i) {
  return [Math.floor(i / 9), i % 9];
}
