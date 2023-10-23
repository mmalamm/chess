import { Coord, GameState } from "../../types";
import { getOrthogonals, getDiagonals } from "./utils/utils";

export function queenFn(
  coord: Coord,
  { whosTurn, boardMap }: Pick<GameState, "whosTurn" | "boardMap">
) {
  return new Set([
    ...getOrthogonals(coord, { whosTurn, boardMap }),
    ...getDiagonals(coord, { whosTurn, boardMap }),
  ]);
}
