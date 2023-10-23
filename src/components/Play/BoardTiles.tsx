import { useContext } from "react";
import { cn } from "@/utils/cn";
import { ChessContext } from "@/hooks/ChessContext";
import { getColFixture, getRowFixture, isWhiteCell } from "./utils/helpers";
import { amIInCheck } from "@/chess/utils/helpers";
import { Coord, PlayerColor } from "@/chess/utils/types";

export function BoardTiles() {
  const {
    state,
    send,
    selectors: { pinnedMoves },
  } = useContext(ChessContext);
  const pov = state.context.uiData.pointOfView;
  const [row, col] = [getRowFixture, getColFixture].map((f) => f(pov));
  const selectedCell = state.context.uiData.selectedCell;

  const { winner, boardMap } = state.context.gameData;
  const [isBlackInCheck, isWhiteInCheck] = (["b", "w"] as PlayerColor[]).map(
    (c) =>
      amIInCheck({
        myColor: c,
        gameState: { boardMap },
      })
  );
  const isTileOccupantInCheck = (color?: PlayerColor) =>
    (color === "b" && isBlackInCheck) || (color === "w" && isWhiteInCheck);
  return (
    <>
      {[...row].map((n) => (
        <div key={"row_" + n} className="flex">
          {[...col].map((l) => {
            const cellCoord = (l + n) as Coord;
            const isSelectedCell = selectedCell === cellCoord;
            const isPlayableMove =
              selectedCell &&
              state.can({
                type: "PLAY_TURN",
                turn: `${selectedCell}${cellCoord}`,
              });
            const isPinnedMove = pinnedMoves.has(cellCoord);
            const isWinningKingCoord =
              winner && `${winner}k` === boardMap[cellCoord]?.pce;
            const isLosingKingCoord =
              winner &&
              `${winner === "b" ? "w" : "b"}k` === boardMap[cellCoord]?.pce;
            const tileOccupantColor = boardMap[cellCoord]?.pce[0] as
              | PlayerColor
              | undefined;
            const isCheckedKingCoord =
              isTileOccupantInCheck(tileOccupantColor) &&
              `${tileOccupantColor}k` === boardMap[cellCoord]?.pce;
            const pressTile = () => {
              if (isPlayableMove) {
                send({
                  type: "PLAY_TURN",
                  turn: `${selectedCell}${cellCoord}`,
                });
              }
            };
            return (
              <div
                key={"cell_" + cellCoord}
                className={cn(
                  "h-[var(--full-size)] w-[var(--full-size)] transition",
                  isPlayableMove && "cursor-pointer",
                  isSelectedCell
                    ? "bg-blue-900"
                    : isWhiteCell(cellCoord)
                    ? "bg-slate-500"
                    : "bg-slate-500/70"
                )}
                onClick={() => {
                  pressTile();
                }}
              >
                <div
                  className={cn(
                    "h-[var(--full-size)] w-[var(--full-size)] transition",
                    isPinnedMove
                      ? "bg-red-600/50"
                      : isPlayableMove
                      ? "bg-green-500/50"
                      : "bg-transparent"
                  )}
                >
                  <div
                    className={cn(
                      "h-[var(--full-size)] w-[var(--full-size)] transition",
                      `bg-gradient-to-tr from-transparent via-transparent`,
                      isWinningKingCoord
                        ? `to-green-600`
                        : isLosingKingCoord
                        ? "to-red-600"
                        : isCheckedKingCoord
                        ? "to-yellow-500"
                        : "to-transparent"
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
