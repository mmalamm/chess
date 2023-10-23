import { CoordOrCut, PlayerColor } from "@/chess/utils/types";

export const createTransfromString = ({
  myColor,
  coord,
}: {
  myColor: PlayerColor;
  coord: CoordOrCut;
}) => {
  const [uiXCoord, uiYCoord] = [getUiXCoord, getUiYCoord].map((f) =>
    f({ myColor, coord })
  );

  return `translate(calc(var(--full-size) * ${uiXCoord}), calc(var(--full-size) * ${uiYCoord}))`;
};

function getUiXCoord({
  myColor,
  coord,
}: {
  myColor: PlayerColor;
  coord: CoordOrCut;
}) {
  if (coord[0] === "x") {
    return 4;
  }
  const fixture = myColor === "w" ? "abcdefgh" : "hgfedcba";
  return fixture.indexOf(coord[0]);
}

function getUiYCoord({
  myColor,
  coord,
}: {
  myColor: PlayerColor;
  coord: CoordOrCut;
}) {
  if (
    (coord === "xw" && myColor === "b") ||
    (coord === "xb" && myColor === "w")
  ) {
    return -11;
  }
  if (
    (coord === "xw" && myColor === "w") ||
    (coord === "xb" && myColor === "b")
  ) {
    return 11;
  }

  const fixture = myColor === "w" ? "87654321" : "12345678";

  return fixture.indexOf(coord[1]);
}

export const getRowFixture = (color: PlayerColor) => {
  return color === "w" ? "87654321" : "12345678";
};

export const getColFixture = (color: PlayerColor) => {
  return color === "w" ? "abcdefgh" : "hgfedcba";
};

export function isWhiteCell(cellCoordinate: string) {
  const letter = cellCoordinate.charAt(0);
  const number = parseInt(cellCoordinate.charAt(1));

  // Check if the sum of letter's ASCII code and number is even
  return (letter.charCodeAt(0) + number) % 2 !== 0;
}
