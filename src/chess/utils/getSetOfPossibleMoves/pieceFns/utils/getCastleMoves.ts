import { splitTurn } from "@/chess/utils/helpers";
import { Coord, GameState } from "../../../types";
import { isEmpty, wouldThisMovePutMeInCheck } from "./utils";

export default function getCastleMoves(
  turn: string,
  {
    whosTurn,
    castle,
    boardMap,
    turns,
  }: Pick<GameState, "whosTurn" | "castle" | "boardMap" | "turns">
): Set<Coord> {
  const castleTracker = castle[whosTurn];
  const { kingSideRookMoved, queenSideRookMoved, kingMoved } = castleTracker;
  const kingLocation = whosTurn === "w" ? "e1" : "e8";
  const { from } = splitTurn(turn);
  const castleMoves = new Set<Coord>();

  if (from !== kingLocation) return castleMoves;

  if (kingMoved) return castleMoves;

  if (!queenSideRookMoved) {
    const cellsToCheck: Coord[] =
      whosTurn === "w" ? ["b1", "c1", "d1"] : ["b8", "c8", "d8"];
    const moveToAdd = whosTurn === "w" ? "c1" : "c8";
    // check queenSideRook path and add if clear
    // check each cell between king and QSR
    // make sure each cell doesnt put king in check

    if (
      cellsToCheck.every(
        (c) =>
          isEmpty(c, boardMap) &&
          !wouldThisMovePutMeInCheck({
            move: `${kingLocation}${c}`,
            gameState: { boardMap, whosTurn, turns },
          })
      )
    ) {
      castleMoves.add(moveToAdd);
    }
  }

  if (!kingSideRookMoved) {
    const cellsToCheck: Coord[] =
      whosTurn === "w" ? ["f1", "g1"] : ["f8", "g8"];
    const moveToAdd = whosTurn === "w" ? "g1" : "g8";
    // check kingSideRook path and add if clear
    // check each cell between king and KSR
    // make sure each cell doesn't put king in check
    if (
      cellsToCheck.every(
        (c) =>
          isEmpty(c, boardMap) &&
          !wouldThisMovePutMeInCheck({
            move: `${kingLocation}${c}`,
            gameState: { boardMap, whosTurn, turns },
          })
      )
    ) {
      castleMoves.add(moveToAdd);
    }
  }
  // rules: https://www.youtube.com/watch?v=FcLYgXCkucc

  return castleMoves;
}
