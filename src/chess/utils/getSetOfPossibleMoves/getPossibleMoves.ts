import "@total-typescript/ts-reset";
import { Coord, GameState } from "../types";
import getAllowedMovesForPiece from "./getAllowedMovesForPiece";
import { wouldThisMovePutMeInCheck } from "./pieceFns/utils/utils";

export function getPossibleMovesWithoutCheckFilter(
  cellCoordsWithPieceToMove: Coord | null, // e.g. c2
  gameState: Pick<GameState, "boardMap" | "turns" | "castle" | "whosTurn">
): Set<Coord> {
  const result = !cellCoordsWithPieceToMove
    ? new Set<Coord>()
    : getAllowedMovesForPiece(cellCoordsWithPieceToMove, gameState);

  return result;
}

export function getPossibleMoves(
  cellCoordWithPieceToMove: Coord | null, // e.g. c2
  gameState: Pick<GameState, "boardMap" | "castle" | "turns" | "whosTurn">
): Set<Coord> {
  if (!cellCoordWithPieceToMove) return new Set<Coord>();
  const moves = getPossibleMovesWithoutCheckFilter(
    cellCoordWithPieceToMove,
    gameState
  );

  // start looking from here

  const s = new Set(
    [...moves].filter(
      (coord) =>
        !wouldThisMovePutMeInCheck({
          move: `${cellCoordWithPieceToMove}${coord}`,
          gameState,
        })
    )
  );

  return s;
}
