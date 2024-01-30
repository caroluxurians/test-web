const board = document.querySelector("#gameboard");

const alphas = "abcdefgh".split("");
const nums = "87654321".split("");

const pieces = [
  {
    id: "pw1",
    image: "public/pawnWhite.png",
    position: "d2",
  },
];

let idOfPieceBeingMoved = null;

const clearBoard = () => {
  board.childNodes.forEach((el) => { el.innerHTML = ""; });
};

const renderPieces = () => {
  pieces.forEach((piece) => {
    const positionDiv = document.getElementById(piece.position);
    const image = document.createElement("img");
    image.setAttribute("src", piece.image);
    image.style.maxWidth = "90%";
    image.setAttribute("class", "piece");
    image.setAttribute("id", piece.id);
    image.setAttribute("draggable", "true");
    image.addEventListener("dragstart", (ev) => {
      idOfPieceBeingMoved = piece.id;
      ev.dataTransfer.setData("image/png", ev.target.id);
    });
    positionDiv.appendChild(image);
  });
};

nums.forEach((col, colIndex) => {
  alphas.forEach((row, rowIndex) => {
    const divId = `${row}${col}`;
    const div = document.createElement("div");
    if ((colIndex + rowIndex) % 2 === 1) {
      div.setAttribute("class", "black");
    }
    div.addEventListener("dragenter", (e) => {
      e.preventDefault();
    });
    div.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    div.addEventListener("drop", (e) => {
      const possibleNewPosition = e.target.id;
      const selectedPiece = pieces.find((el) => el.id === idOfPieceBeingMoved);
      // const pieceType = selectedPiece.id[0];
      // const pieceColor = selectedPiece.id[1];
      // totéž kratší (destrukturalizace):
      const [pieceType, pieceColor] = selectedPiece.id;
      const currentPosition = selectedPiece.position;
      const [positionAlpha, positionNum] = currentPosition;
      console.log(pieceType, pieceColor, positionAlpha, positionNum)
      let isMoveLegal = false;
      if (pieceType === "p") {

      }
      // if bílej pěšec
      // current position: a2
      // if possibleNewPosition: a3 or a4:
      selectedPiece.position = possibleNewPosition;
      // else nic
      clearBoard();
      renderPieces();
    });
    div.setAttribute("id", divId);
    board.appendChild(div);
  });
});

renderPieces();

//let dragStartPosition
//div.dragStart(e) => {
//dragStartPosition = e.target.parentNode.getAttribute("divId");
//}
//div.addEventListener("dragstart", dragStart);///