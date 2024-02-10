const board = document.querySelector("#gameboard");
const trash = document.querySelector("#trash");

const alphas = "abcdefgh".split("");
const nums = "87654321".split("");

const pieces = [
  {
    id: "pw1",
    image: "public/pawnWhite.png",
    position: "a2",
  },
  {
    id: "pw2",
    image: "public/pawnWhite.png",
    position: "b2",
  },
  {
    id: "pw3",
    image: "public/pawnWhite.png",
    position: "c2",
  },
  {
    id: "pw4",
    image: "public/pawnWhite.png",
    position: "d2",
  },
  {
    id: "pw5",
    image: "public/pawnWhite.png",
    position: "e2",
  },
  {
    id: "pw6",
    image: "public/pawnWhite.png",
    position: "f2",
  },
  {
    id: "pw7",
    image: "public/pawnWhite.png",
    position: "g2",
  },
  {
    id: "pw8",
    image: "public/pawnWhite.png",
    position: "h2",
  },
  {
    id: "pb1",
    image: "public/pawnBlack.png",
    position: "a7",
  },
  {
    id: "pb2",
    image: "public/pawnBlack.png",
    position: "b7",
  },
  {
    id: "pb3",
    image: "public/pawnBlack.png",
    position: "c7",
  },
  {
    id: "pb4",
    image: "public/pawnBlack.png",
    position: "d7",
  },
  {
    id: "pb5",
    image: "public/pawnBlack.png",
    position: "e7",
  },
  {
    id: "pb6",
    image: "public/pawnBlack.png",
    position: "f7",
  },
  {
    id: "pb7",
    image: "public/pawnBlack.png",
    position: "g7",
  },
  {
    id: "pb8",
    image: "public/pawnBlack.png",
    position: "h7",
  },
  {
    id: "rw1",
    image: "public/rookWhite.png",
    position: "a1",
  },
  {
    id: "rw2",
    image: "public/rookWhite.png",
    position: "h1",
  },
  {
    id: "rb1",
    image: "public/rookBlack.png",
    position: "a8",
  },
  {
    id: "rb2",
    image: "public/rookBlack.png",
    position: "h8",
  },
  {
    id: "hw1",
    image: "public/horseWhite.png",
    position: "b1",
  },
  {
    id: "hw2",
    image: "public/horseWhite.png",
    position: "g1",
  },
  {
    id: "hb1",
    image: "public/horseBlack.png",
    position: "b8",
  },
  {
    id: "hb2",
    image: "public/horseBlack.png",
    position: "g8",
  },
  {
    id: "bw1",
    image: "public/bishopWhite.png",
    position: "c1",
  },
  {
    id: "bw2",
    image: "public/bishopWhite.png",
    position: "f1",
  },
  {
    id: "bb1",
    image: "public/bishopBlack.png",
    position: "c8",
  },
  {
    id: "bb2",
    image: "public/bishopBlack.png",
    position: "f8",
  },
  {
    id: "qw",
    image: "public/queenWhite.png",
    position: "d1",
  },
  {
    id: "qb",
    image: "public/queenBlack.png",
    position: "d8",
  },
  {
    id: "kw",
    image: "public/kingWhite.png",
    position: "e1",
  },
  {
    id: "kb",
    image: "public/kingBlack.png",
    position: "e8",
  },
];

let idOfPieceBeingMoved = null;

const clearBoard = () => {
  board.childNodes.forEach((el) => { el.innerHTML = ""; });
  trash.innerHTML = "";
};

const renderPieces = () => {
  pieces.forEach((piece) => {
    const positionDiv = document.getElementById(piece.position);
    const image = document.createElement("img");
    image.setAttribute("src", piece.image);
    image.setAttribute("class", "piece");
    image.setAttribute("id", piece.id);
    if (piece.position !== "trash") {
      image.style.width = "100%";
      image.style.objectFit = "contain";
      image.setAttribute("draggable", "true");
      image.addEventListener("dragstart", (ev) => {
        idOfPieceBeingMoved = piece.id;
        ev.dataTransfer.setData("image/png", ev.target.id);
      });
    }
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
  const currentPositionAlphaIndex = alphas.indexOf(currentPositionAlpha);
  const possibleNewPositionAlphaIndex = alphas.indexOf(possibleNewPositionAlpha);
  // console.log(currentPositionAlpha,
  //  currentPositionAlphaIndex, possibleNewPositionAlpha, possibleNewPositionAlphaIndex);
  const pieceOnTarget = pieces.find((el) => el.position === possibleNewPosition);
  // console.log(pieceOnTarget);
  if (pieceType === "p") {
    const direction = isPieceBlack ? 1 : -1;
    if (currentPositionAlpha === possibleNewPositionAlpha) {
      if (currentPositionNum === possibleNewPositionNum + 1 * direction) {
        if (!pieceOnTarget) {
          return true;
        }
      }

      if (currentPositionNum === (isPieceBlack ? 7 : 2)
        && currentPositionNum === possibleNewPositionNum + 2 * direction) {
        return true;
      }
    }
    if (possibleNewPositionAlphaIndex + 1 === currentPositionAlphaIndex
      || possibleNewPositionAlphaIndex - 1 === currentPositionAlphaIndex) {
      if (currentPositionNum === possibleNewPositionNum + 1 * direction) {
        if (pieceOnTarget) {
          pieceOnTarget.position = "trash";
          return true;
        }
      }
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

// is black /white
// check if possible new position occupied opačnou barvou
// když tam šloupnu figurka zmizne

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
