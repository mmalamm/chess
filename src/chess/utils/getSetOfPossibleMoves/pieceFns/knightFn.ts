import { splitTurn } from "../../helpers";
import { GameState } from "../../types";
import { getKnightCoords } from "./utils/getKnightCoords";
import { hasAlliedPiece } from "./utils/utils";

export function knightFn(
  turn: string,
  { whosTurn, boardMap }: Pick<GameState, "boardMap" | "whosTurn">
) {
  const { from } = splitTurn(turn);
  const knightCoords = getKnightCoords(from);
  return new Set(
    [...knightCoords].filter(
      (coord) => !hasAlliedPiece(coord, { whosTurn, boardMap })
    )
  );
}
