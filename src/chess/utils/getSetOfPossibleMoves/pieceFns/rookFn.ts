import { Coord, GameState } from "../../types";
import { getOrthogonals } from "./utils/utils";

export function rookFn(
  coord: Coord,
  { whosTurn, boardMap }: Pick<GameState, "whosTurn" | "boardMap">
) {
  return getOrthogonals(coord, { whosTurn, boardMap });
}
