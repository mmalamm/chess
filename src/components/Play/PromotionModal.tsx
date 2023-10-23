import { CSSProperties, useContext, useState } from "react";
import {
  PieceLetter,
  PieceSymbol,
  PlayerColor,
  PromotionOptions,
  TurnString,
} from "@/chess/utils/types";
import Button from "@/components/shared/Button";
import { ChessContext } from "@/hooks/ChessContext";
import { PlayScreenModal } from "./PlayScreenModal";
import { PIECES } from "@/utils/pieces_paths";

export function PromotionModal() {
  const { send, state } = useContext(ChessContext);
  const myColor = state.context.gameData.whosTurn;

  const playTurn = (turn: TurnString) => {
    send({
      type: "PLAY_TURN",
      turn,
    });
  };

  const onModalClose = () => {
    send({
      type: "CLOSE_MODAL",
    });
  };

  return (
    <div>
      {state.matches("playing.promotionModal") && !!myColor ? (
        <PlayScreenModal {...{ onModalClose }}>
          <PromotionPrompt {...{ playTurn, myColor }} />
        </PlayScreenModal>
      ) : null}
    </div>
  );
}

function PromotionPrompt({
  myColor,
  playTurn,
}: {
  myColor: PlayerColor;
  playTurn: (turn: TurnString) => void;
}) {
  const {
    state: {
      context: {
        uiData: { promotionTurn },
      },
    },
  } = useContext(ChessContext);
  const [promotionSelection, setPromotionSelection] =
    useState<PromotionOptions>("q");
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-slate-700 p-4 opacity-100`}
    >
      <h4 className="p-0 pb-4">Promote Pawn</h4>
      <div className="mb-4 grid grid-cols-2 grid-rows-2 gap-6">
        {(["r", "h", "b", "q"] as const).map((c) => {
          return (
            <button
              type="button"
              className={`relative bg-slate-500`}
              key={c}
              onClick={() => {
                setPromotionSelection(c);
              }}
            >
              {promotionSelection === c ? (
                <div className="absolute right-0 h-6 w-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 p-1.5 font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                </div>
              ) : null}
              <Piece
                pieceSymbol={(myColor + c) as PieceSymbol}
                className=" h-14"
              />
            </button>
          );
        })}
      </div>
      <Button
        onClick={() => {
          // playTurn(promotionTurn + "_" + promotionSelection);
          const ts = `${promotionTurn}_${promotionSelection}` as TurnString;
          playTurn(ts);
        }}
      >
        Submit
      </Button>
    </div>
  );
}

function Piece({
  pieceSymbol,
  className,
  style,
}: {
  pieceSymbol: PieceSymbol;
  className: string;
  style?: CSSProperties;
}) {
  const color = pieceSymbol[0] === "w" ? "white" : "black";

  const pce = pieceSymbol[1] as PieceLetter;

  return (
    <div className={className} style={{ ...(style ? style : {}) }}>
      <svg
        width="175"
        height="175"
        viewBox="0 0 46.302083 46.302083"
        style={{
          fill: color,
          width: "100%",
          height: "100%",
        }}
      >
        <g transform={PIECES[pce].t}>
          <path d={PIECES[pce].d} />
        </g>
      </svg>
    </div>
  );
}
