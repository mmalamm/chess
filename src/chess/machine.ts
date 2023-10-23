import { assign, createMachine } from "xstate";
import { TurnString, PlayerColor, Coord, GameState } from "./utils/types";
import { createNewGame, processUndo } from "./utils/helpers";
import { checkTurn } from "@/chess/utils/checkTurn/checkTurn";
import { TurnDetail } from "@/chess/utils/types";
import { isPromotionTurn } from "@/chess/utils/helpers";
import { processTurn } from "./utils/processTurn/processTurn";

export const selfChessMachine = createMachine(
  {
    predictableActionArguments: true,
    id: "chess",
    initial: "playing",
    schema: {
      events: {} as
        | {
            type: "PLAY_TURN";
            turn: TurnString;
          }
        | {
            type: "CHOOSE_SIDE";
            side: PlayerColor;
          }
        | {
            type: "SELECT_CELL";
            cell: Coord;
          }
        | {
            type: "RESET_STATE";
          }
        | { type: "DESELECT_CELL" }
        | { type: "CLOSE_MODAL" }
        | { type: "UNDO_TURN"; lastTurnDetailed: TurnDetail },
      context: {} as {
        gameData: GameState;
        uiData: {
          selectedCell: Coord | null;
          pointOfView: PlayerColor;
          promotionTurn: TurnString | null;
          settings: {
            inputType: "click" | "drag";
          };
        };
      },
    },
    tsTypes: {} as import("./machine.typegen").Typegen0,
    on: {
      CHOOSE_SIDE: {
        actions: ["assignSide"],
      },
      UNDO_TURN: {
        target: "playing",
        actions: ["undoTurn"],
        cond: "canUndoTurn",
      },
      RESET_STATE: {
        actions: ["resetState"],
      },
    },
    states: {
      playing: {
        initial: "idle",
        always: [
          {
            target: "game_over",
            cond: "isGameOver",
          },
        ],
        states: {
          idle: {
            entry: ["clearCellSelection"],
            on: {
              SELECT_CELL: {
                target: "cellSelected",
                cond: "isCellSelectable",
              },
            },
          },
          cellSelected: {
            entry: ["selectCell"],
            on: {
              SELECT_CELL: {
                target: "cellSelected",
                cond: "isCellSelectable",
              },
              PLAY_TURN: [
                {
                  target: "promotionModal",
                  cond: "isPromotionTurn",
                  actions: ["setPromotionTurn"],
                },
                {
                  target: "idle",
                  actions: ["processTurn"],
                  cond: "isValidTurn",
                },
              ],
            },
          },
          promotionModal: {
            on: {
              PLAY_TURN: {
                cond: "isValidTurn",
                actions: ["processTurn", "clearPromotionTurn"],
                target: "idle",
              },
              CLOSE_MODAL: {
                target: "idle",
                actions: ["clearPromotionTurn"],
              },
            },
          },
        },
      },
      game_over: {
        on: {
          RESET_STATE: {
            target: "playing",
            actions: ["resetState"],
          },
        },
      },
    },
  },
  {
    guards: {
      canUndoTurn: (ctx) => {
        return ctx.gameData.turns.length > 0;
      },
      isGameOver: (ctx) => {
        return !!ctx.gameData?.winner;
      },
      isValidTurn: (ctx, evt) => {
        if (!ctx.gameData) return false;
        const isValidTurn = checkTurn({
          turn: evt.turn,
          gameData: {
            boardMap: ctx.gameData.boardMap,
            castle: ctx.gameData.castle,
            turns: ctx.gameData.turns,
            whosTurn: ctx.gameData.whosTurn,
          },
        });
        return isValidTurn;
      },
      isCellSelectable: (ctx, evt) => {
        return (
          ctx.gameData.whosTurn === ctx.gameData.boardMap[evt.cell]?.pce[0]
        );
      },
      isPromotionTurn: ({ gameData }, evt) => {
        const isValidTurn = checkTurn({
          turn: evt.turn,
          gameData: {
            boardMap: gameData.boardMap,
            castle: gameData.castle,
            turns: gameData.turns,
            whosTurn: gameData.whosTurn,
          },
        });
        return (
          isValidTurn &&
          isPromotionTurn(evt.turn, {
            boardMap: gameData.boardMap,
            whosTurn: gameData.whosTurn,
          })
        );
      },
    },
    actions: {
      processTurn: assign((ctx, evt) => {
        return { gameData: processTurn(evt.turn, ctx.gameData) };
      }),
      undoTurn: assign((ctx, evt) => {
        const newGameState = processUndo(evt.lastTurnDetailed, ctx.gameData);
        return {
          gameData: newGameState,
        };
      }),
      selectCell: assign((ctx, evt) => {
        return {
          uiData: {
            ...ctx.uiData,
            selectedCell: evt.cell,
          },
        };
      }),
      setPromotionTurn: assign((ctx, evt) => {
        return {
          uiData: {
            ...ctx.uiData,
            promotionTurn: evt.turn,
          },
        };
      }),
      clearPromotionTurn: assign((ctx) => {
        return {
          uiData: {
            ...ctx.uiData,
            promotionTurn: null,
          },
        };
      }),
      assignSide: assign((ctx, evt) => {
        return {
          uiData: {
            ...ctx.uiData,
            pointOfView: evt.side,
          },
        };
      }),
      clearCellSelection: assign((ctx) => {
        return {
          uiData: {
            ...ctx.uiData,
            selectedCell: null,
          },
        };
      }),
      resetState: assign((ctx) => {
        return {
          gameData: createNewGame(),
          uiData: {
            ...ctx.uiData,
            selectedCell: null,
            promotionTurn: null,
          },
        };
      }),
    },
  }
);
