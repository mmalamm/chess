import { dd, splitTurn } from "../helpers";
import { CastleTracker, GameState } from "../types";

export default function getNewCastleState(
  turn: string,
  {
    whosTurn,
    boardMap,
    castle,
  }: Pick<GameState, "whosTurn" | "boardMap" | "castle">
): { b: CastleTracker; w: CastleTracker } {
  const { from } = splitTurn(turn);
  const isKing = boardMap[from]?.pce[1] === "k";
  const newCastle: { b: CastleTracker; w: CastleTracker } = dd(castle);
  if (isKing) {
    newCastle[whosTurn].kingMoved = true;
    return newCastle;
  }

  const isRook = boardMap[from]?.pce[1] === "r";
  const queenSideRookCoords = whosTurn === "w" ? "a1" : "a8";
  const kingsSideRookCoords = whosTurn === "w" ? "h1" : "h8";

  if (queenSideRookCoords === from && isRook) {
    newCastle[whosTurn].queenSideRookMoved = true;
    return newCastle;
  }

  if (kingsSideRookCoords === from && isRook) {
    newCastle[whosTurn].kingSideRookMoved = true;
    return newCastle;
  }

  return newCastle;
}
