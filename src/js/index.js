const board = document.querySelector("#gameboard");

const alphas = "abcdefgh".split("");
const nums = "87654321".split("");

alphas.forEach((col, colIndex) => {
  nums.forEach((row, rowIndex) => {
    const divId = `${col}${row}`;
    const div = document.createElement("div");
    if ((colIndex + rowIndex) % 2 === 1) {
      div.setAttribute("class", "black");
    }
    div.setAttribute("id", divId);
    board.appendChild(div);
  });
});
