import { splitTurn } from "../../helpers";
import { GameState } from "../../types";
import {
  getEnPassantTurn,
  getFwdAdjacentDiagCoords,
  getOneCellFwd,
  hasEnemyPiece,
  isEmpty,
  isHomeRow,
} from "./utils/utils";

export const pawnFn = (
  turn: string,
  {
    boardMap,
    whosTurn,
    turns,
  }: Pick<GameState, "boardMap" | "whosTurn" | "turns">
) => {
  const { from: cellCoord } = splitTurn(turn);
  const color = whosTurn;
  const lastTurn = turns.at(-1);
  const moves = new Set();

  const oneCellFwd = getOneCellFwd(cellCoord, color);
  if (!oneCellFwd) throw new Error("cannot go off the board");
  const cellInFrontIsEmpty = isEmpty(oneCellFwd, boardMap);
  if (cellInFrontIsEmpty) moves.add(oneCellFwd);

  const diagonals = getFwdAdjacentDiagCoords(cellCoord, color);
  diagonals.forEach((d) => {
    if (d && hasEnemyPiece(d, { whosTurn, boardMap })) moves.add(d);
  });

  if (isHomeRow(cellCoord, color) && cellInFrontIsEmpty) {
    const jumpMove = getOneCellFwd(oneCellFwd, color);
    if (jumpMove && isEmpty(jumpMove, boardMap)) moves.add(jumpMove);
  }

  const enPassantMove = getEnPassantTurn(cellCoord, lastTurn, color);
  if (enPassantMove) moves.add(enPassantMove);

  return moves;
};
