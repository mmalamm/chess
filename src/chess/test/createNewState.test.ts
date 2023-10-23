import { createNewBoardMap, createNewCastleState } from "../utils/helpers";
import { processTurn as createNewState } from "../utils/processTurn/processTurn";
import { Coord, GameState } from "../utils/types";
import { describe, expect, it } from "vitest";

describe("create new state", () => {
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
  it("does not end game unexpectedly", () => {
    const newState = createNewState("a2a3", gameData);
    expect(newState?.winner).toBeNull();
  });
  it("applies turn correctly", () => {
    const newState = createNewState("a2a3", gameData);
    expect(newState.boardMap.a2).toBeFalsy();
    expect(newState.boardMap.a3).toEqual({ pce: "wp", id: "_wpa2" });

    const restOfCells = getAllBoardCoords().filter(
      (c) => !["a2", "a3"].includes(c)
    );

    for (let _coord of restOfCells) {
      const coord = _coord as Coord;
      expect(gameData.boardMap[coord]).toEqual(newState.boardMap[coord]);
    }
  });
});

export const getAllBoardCoords = () => {
  const output = [];
  for (let l of "abcdefgh") {
    for (let n of "12345678") {
      output.push(l + n);
    }
  }

  return output;
};
