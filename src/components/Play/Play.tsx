import { useContext } from "react";
import { ChessContext } from "@/hooks/ChessContext";
import { Pieces } from "./Pieces";
import { BoardTiles } from "./BoardTiles";
import Button from "../shared/Button";
import { PromotionModal } from "./PromotionModal";
import Footer from "../shared/Footer";

export function Play() {
  const {
    state,
    send,
    selectors: { lastTurnDetailed },
  } = useContext(ChessContext);

  const pov = state.context.uiData.pointOfView;

  return (
    <>
      <main className="flex flex-col h-screen items-center justify-around">
        <div>
          <div className="relative  overflow-hidden">
            <Pieces />
            <BoardTiles />
          </div>

          <div className="flex w-[var(--board-width)] justify-between pt-4">
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  send({
                    type: "CHOOSE_SIDE",
                    side: pov === "b" ? "w" : "b",
                  });
                }}
              >
                Swap
              </Button>
              <Button
                onClick={() => {
                  lastTurnDetailed &&
                    send({
                      type: "UNDO_TURN",
                      lastTurnDetailed,
                    });
                }}
                disabled={
                  !(
                    lastTurnDetailed &&
                    state.can({
                      type: "UNDO_TURN",
                      lastTurnDetailed,
                    })
                  )
                }
              >
                Undo
              </Button>
            </div>
            <Button
              onClick={() => {
                lastTurnDetailed &&
                  send({
                    type: "RESET_STATE",
                  });
              }}
              className="bg-red-700"
            >
              Reset
            </Button>
          </div>
          <PromotionModal />
        </div>

        <Footer />
      </main>
    </>
  );
}
