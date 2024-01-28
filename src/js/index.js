const board = document.querySelector("#gameboard");

const alphas = "abcdefgh".split("");
const nums = "87654321".split("");

nums.forEach((col, colIndex) => {
  alphas.forEach((row, rowIndex) => {
    const divId = `${row}${col}`;
    const div = document.createElement("div");
    if ((colIndex + rowIndex) % 2 === 1) {
      div.setAttribute("class", "black");
    }
    div.setAttribute("id", divId);
    board.appendChild(div);
  });
});

const pieces = [
  {
    image: "public/pawnWhite.png",
    position: "d2",
  },
];

pieces.forEach((piece) => {
  const positionDiv = document.getElementById(piece.position);
  const image = document.createElement("img");
  image.setAttribute("src", piece.image);
  image.style.maxWidth = "90%"
  positionDiv.appendChild(image);
});
