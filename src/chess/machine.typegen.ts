// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignSide: "CHOOSE_SIDE";
    clearCellSelection:
      | "CLOSE_MODAL"
      | "PLAY_TURN"
      | "RESET_STATE"
      | "UNDO_TURN"
      | "xstate.init";
    clearPromotionTurn: "CLOSE_MODAL" | "PLAY_TURN";
    processTurn: "PLAY_TURN";
    resetState: "RESET_STATE";
    selectCell: "SELECT_CELL";
    setPromotionTurn: "PLAY_TURN";
    undoTurn: "UNDO_TURN";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    canUndoTurn: "UNDO_TURN";
    isCellSelectable: "SELECT_CELL";
    isGameOver: "";
    isPromotionTurn: "PLAY_TURN";
    isValidTurn: "PLAY_TURN";
  };
  eventsCausingServices: {};
  matchesStates:
    | "game_over"
    | "playing"
    | "playing.cellSelected"
    | "playing.idle"
    | "playing.promotionModal"
    | { playing?: "cellSelected" | "idle" | "promotionModal" };
  tags: never;
}
