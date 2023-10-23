import { GameState } from "../../types";
import { orthogonalFunctions as o } from "./utils/orthogonalFunctions";
import { diagonalFunctions as d } from "./utils/diagonalFunctions";
import { hasAlliedPiece } from "./utils/utils";
import { splitTurn } from "../../helpers";
import getCastleMoves from "./utils/getCastleMoves";

export function kingFn(
  turn: string,
  {
    whosTurn,
    boardMap,
    turns,
    castle,
  }: Pick<GameState, "whosTurn" | "boardMap" | "turns" | "castle">
) {
  const { from: k } = splitTurn(turn);
  const orthos = [o.o1(k), o.o8(k), o.oa(k), o.oh(k)].filter(Boolean);
  const diags = [d.a1d(k), d.a8d(k), d.h1d(k), d.h8d(k)].filter(Boolean);

  const moves = new Set(
    [...orthos, ...diags].filter(
      (coord) => !hasAlliedPiece(coord, { whosTurn, boardMap })
    )
  );

  const castleMoves = getCastleMoves(turn, {
    whosTurn,
    boardMap,
    turns,
    castle,
  });

  return new Set([...moves, ...castleMoves]);
}
