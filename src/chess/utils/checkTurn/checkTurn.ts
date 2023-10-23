import { GameState } from "../types";
import { getPossibleMoves } from "../getSetOfPossibleMoves/getPossibleMoves";
import { splitTurn } from "../helpers";

export const checkTurn = ({
  turn,
  gameData,
}: {
  turn: string;
  gameData: Pick<GameState, "boardMap" | "whosTurn" | "castle" | "turns">;
}): boolean => {
  const { to: turnToCell, from: turnFromCell } = splitTurn(turn);

  const fromCellContent = gameData.boardMap[turnFromCell];

  if (fromCellContent?.pce[0] !== gameData.whosTurn) return false;

  const setOfPossibleMoves = getPossibleMoves(turnFromCell, gameData);

  return setOfPossibleMoves.has(turnToCell);
};
