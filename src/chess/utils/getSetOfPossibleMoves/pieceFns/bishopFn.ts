import { Coord, GameState } from "../../types";
import { getDiagonals } from "./utils/utils";

export function bishopFn(
  coord: Coord,
  { whosTurn, boardMap }: Pick<GameState, "whosTurn" | "boardMap">
) {
  return getDiagonals(coord, { whosTurn, boardMap });
}
