import { useContext } from "react";
import { ChessContext } from "@/hooks/ChessContext";
import { PieceLetter } from "@/chess/utils/types";
import { cn } from "@/utils/cn";
import { PIECES } from "@/utils/pieces_paths";
import { createTransfromString } from "./utils/helpers";

export function Pieces() {
  const {
    state,
    send,
    selectors: { pieceNodes },
  } = useContext(ChessContext);

  const pov = state.context.uiData.pointOfView;
  const selectedCell = state.context.uiData.selectedCell;
  return (
    <>
      {Object.entries(pieceNodes).map((n) => {
        const [pieceId, { pos, pce }] = n;
        const fill = pce[0] === "w" ? "white" : "black";
        const pieceLetter = pce[1] as PieceLetter;
        const isPieceSelectable =
          pos !== "xb" &&
          pos !== "xw" &&
          state.can({
            type: "SELECT_CELL",
            cell: pos,
          });
        const isPlayableTurn =
          selectedCell &&
          pos !== "xb" &&
          pos !== "xw" &&
          state.can({
            type: "PLAY_TURN",
            turn: `${selectedCell}${pos}`,
          });
        const pressTile = () => {
          if (pos === "xb" || pos === "xw")
            throw new Error("how are you clicking that");
          if (isPieceSelectable) {
            send({
              type: "SELECT_CELL",
              cell: pos,
            });
          } else if (isPlayableTurn) {
            send({
              type: "PLAY_TURN",
              turn: `${selectedCell}${pos}`,
            });
          }
        };
        return (
          <div
            key={pieceId}
            className={cn(
              "absolute h-[var(--full-size)] w-[var(--full-size)] transition",
              isPieceSelectable || isPlayableTurn
                ? "cursor-pointer"
                : "cursor-default"
            )}
            style={{
              transform: createTransfromString({
                myColor: pov,
                coord: pos,
              }),
            }}
            onClick={() => {
              pressTile();
            }}
          >
            <svg
              width="175"
              height="175"
              viewBox="0 0 46.302083 46.302083"
              style={{
                fill,
                width: "100%",
                height: "100%",
              }}
            >
              <g transform={PIECES[pieceLetter].t}>
                <path d={PIECES[pieceLetter].d} />
              </g>
            </svg>
          </div>
        );
      })}
    </>
  );
}
