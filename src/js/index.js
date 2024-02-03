const board = document.querySelector("#gameboard");

const alphas = "abcdefgh".split("");
const nums = "87654321".split("");

const pieces = [
  {
    id: "pw1",
    image: "public/pawnWhite.png",
    position: "d2",
  },
  {
    id: "pb1",
    image: "public/pawnBlack.png",
    position: "c7",
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
    image.style.width = "100%";
    image.style.objectFit = "contain";
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

const checkMove = (selectedPiece, possibleNewPosition) => {
  // const pieceType = selectedPiece.id[0];
  // const pieceColor = selectedPiece.id[1];
  // totéž kratší (destrukturalizace):
  const [pieceType, pieceColor] = selectedPiece.id;
  const isPieceBlack = pieceColor === "b";
  const currentPositionAlpha = selectedPiece.position[0];
  const currentPositionNum = Number(selectedPiece.position[1]);
  const possibleNewPositionAlpha = possibleNewPosition[0];
  const possibleNewPositionNum = Number(possibleNewPosition[1]);
  const currentPositionAlphaIndex = Number(alphas.indexOf(currentPositionAlpha));
  const possibleNewPositionAlphaIndex = currentPositionAlphaIndex - 1;
  console.log(currentPositionAlpha, currentPositionAlphaIndex, possibleNewPositionAlpha, possibleNewPositionAlphaIndex);
  // const possibleNewPositionAlphaIndex1 = currentPositionAlphaIndex + 1;
  // const possibleNewPositionAlphaIndex2 = currentPositionAlphaIndex - 1;
  // console.log(possibleNewPositionAlphaIndex1, possibleNewPositionAlphaIndex2);

  if (pieceType === "p") {
    const direction = isPieceBlack ? 1 : -1;
    if (currentPositionAlpha === possibleNewPositionAlpha) {
      if (currentPositionNum === possibleNewPositionNum + 1 * direction);
      return true;
    }
    if (currentPositionNum === (isPieceBlack ? 7 : 2)
      && currentPositionNum === possibleNewPositionNum + 2 * direction) {
      return true;
    }
    if (possibleNewPositionAlphaIndex + 1 === currentPositionAlphaIndex) {
      return (true);
    }
  }
  return false;
};
// podminky:
// p -> počáteční tah nebo ne ->
// -počáteční tah -> může o dva
// -ne počáteční tah ->
//    -o jeden vpřed když tam nikdo nestojí
//    -o jeden diagonálně když tam někdo stojí

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
      const possibleNewPosition = e.target.tagName === "IMG"
        ? e.target.parentElement.id
        : e.target.id;
      const selectedPiece = pieces.find((el) => el.id === idOfPieceBeingMoved);
      const isMoveLegal = checkMove(selectedPiece, possibleNewPosition);
      if (isMoveLegal) {
        selectedPiece.position = possibleNewPosition;
      }
      clearBoard();
      renderPieces();
    });
    div.setAttribute("id", divId);
    board.appendChild(div);
  });
});

renderPieces();
