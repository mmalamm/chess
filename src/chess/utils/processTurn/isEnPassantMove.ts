import { getFwdAdjacentDiagCoords, getOneCellFwd } from "../getSetOfPossibleMoves/pieceFns/utils/utils";
import { splitTurn, wasTheLastMoveTwoSquarePawnMove } from "../helpers";
import { GameState } from "../types";

export default function isEnPassantMove(
  turn: string,
  { boardMap, turns }: Pick<GameState, "boardMap" | "turns">
): boolean {
  // TODO: IMPLEMENT THIS
  const { to, from } = splitTurn(turn);
  const turnPlayersColor = boardMap[from]?.pce[0];
  const lastTurn = turns.at(-1);
  if (lastTurn === undefined) return false;

  // - The capturing pawn must have advanced exactly three ranks to perform this move.
  const enPassantRow = turnPlayersColor === "w" ? 5 : 4;
  const isEnPassantRow = from[1] === `${enPassantRow}`;

  // - The captured pawn must have moved two squares in one move,
  const didPawnMoveTwoSquaresLastTurn = wasTheLastMoveTwoSquarePawnMove(
    lastTurn,
    { boardMap }
  );

  //  landing right next to the capturing pawn.
  const pawnBeingCapturedCoords = splitTurn(lastTurn).to;
  const capturingPawnCoords = from;
  const isCapturedPawnNextToCapturingPawn =
    areCoordsHorizontallyAdjacentToEachOther(
      pawnBeingCapturedCoords,
      capturingPawnCoords
    );

  // - The en passant capture must be performed on the turn immediately after the pawn being captured moves. If the player does not capture en passant on that turn, they no longer can do it later.
  // this ^ condition is satisfied since I'm checking the last turn already

  // I need to perform another check to make sure the capturing Cell is behind the capturedPawn
  const capturingCellCandidate = to;
  const colorBeingCaptured = boardMap[splitTurn(lastTurn).to]?.pce[0];
  if (colorBeingCaptured !== "w" && colorBeingCaptured !== "b")
    throw new Error("something went wrong with colorBeingCaptured");
  const isCapturingCellBehindCapturedPawn =
    pawnBeingCapturedCoords ===
    getOneCellFwd(capturingCellCandidate, colorBeingCaptured);

  // toCellCoords is forward-diagonally-adjacent to the fromCell
  const capturingPlayerColor = turnPlayersColor;
  if (capturingPlayerColor !== "w" && capturingPlayerColor !== "b")
    throw new Error("something went wrong with capturingPlayerColor");
  const fwdAdjacentDiagonalsSet = getFwdAdjacentDiagCoords(
    from,
    capturingPlayerColor
  );
  const isToCellFwdDiagonallyAdjacentToFromCell =
    fwdAdjacentDiagonalsSet.has(to);

  return (
    isEnPassantRow &&
    didPawnMoveTwoSquaresLastTurn &&
    isCapturedPawnNextToCapturingPawn &&
    isCapturingCellBehindCapturedPawn &&
    isToCellFwdDiagonallyAdjacentToFromCell
  );
}

function areCoordsHorizontallyAdjacentToEachOther(
  coord1: string,
  coord2: string
): boolean {
  // TODO: the code below was generated with chat gpt
  ///// get rid of this when you get a chance
  if (coord1.length !== 2 || coord2.length !== 2) {
    throw new Error(
      "Invalid coordinate format. Coordinates must be 2 characters."
    );
  }

  const col1 = coord1.charCodeAt(0);
  const col2 = coord2.charCodeAt(0);
  const row1 = parseInt(coord1.charAt(1));
  const row2 = parseInt(coord2.charAt(1));

  const colDiff = Math.abs(col1 - col2);
  const rowDiff = Math.abs(row1 - row2);

  return colDiff === 1 && rowDiff === 0;
  //////
}