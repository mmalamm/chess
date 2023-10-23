import { describe, expect, it } from "vitest";

import { checkTurn } from "../../utils/checkTurn/checkTurn";

import { GameState } from "../../utils/types";
import { createNewBoardMap, createNewCastleState } from "@/chess/utils/helpers";

describe("checkTurn", () => {
  const gameData: GameState = {
    whosTurn: "w",
    boardMap: createNewBoardMap(),
    castle: {
      w: createNewCastleState(),
      b: createNewCastleState(),
    },
    turns: [],
    winner: null,
  };
  it("returns true for valid move", () => {
    const result = checkTurn({ turn: "a2a3", gameData });
    expect(result).toBeTruthy();
  });
  it("returns true for valid move", () => {
    expect(checkTurn({ turn: "a2a4", gameData })).toBeTruthy();
    expect(checkTurn({ turn: "b1a3", gameData })).toBeTruthy();
    expect(checkTurn({ turn: "b1c3", gameData })).toBeTruthy();
  });
  it("returns false for invalid move", () => {
    expect(checkTurn({ turn: "a2a5", gameData })).toBeFalsy();
    expect(checkTurn({ turn: "c1e3", gameData })).toBeFalsy();
  });
  it("returns false if not your turn", () => {
    const result = checkTurn({ turn: "a7a6", gameData });
    expect(result).toBeFalsy();
  });
});
