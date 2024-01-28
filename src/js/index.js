const board = document.querySelector("#gameboard");

const alphas = "abcdefgh".split("");
const nums = "87654321".split("");

alphas.forEach((col) => {
  nums.forEach((row) => {
    const divId = `${col}${row}`;
    const div = document.createElement("div");
    div.setAttribute("id", divId);
    board.appendChild(div);
  });
});

