import { describe, expect, it } from "vitest";

import { wouldThisMovePutMeInCheck } from "@/chess/utils/getSetOfPossibleMoves/pieceFns/utils/utils";
import { GameState } from "@/chess/utils/types";

const buggyState = {
  boardMap: {
    a8: { pce: "br", id: "_bra8" },
    c8: { pce: "bb", id: "_bbc8" },
    c7: { pce: "bp", id: "_bpc7" },
    d7: { pce: "bp", id: "_bpd7" },
    f7: { pce: "bp", id: "_bpf7" },
    g7: { pce: "bp", id: "_bpg7" },
    h7: { pce: "bk", id: "_bke8" },
    a2: { pce: "wp", id: "_wpa2" },
    c2: { pce: "wp", id: "_wpc2" },
    a1: { pce: "wr", id: "_wra1" },
    b1: { pce: "wh", id: "_whb1" },
    e4: { pce: "wp", id: "_wpe2" },
    e5: { pce: "bp", id: "_bpe7" },
    g3: { pce: "wp", id: "_wph2" },
    f8: { pce: "br", id: "_brh8" },
    c4: { pce: "wb", id: "_wbf1" },
    c6: { pce: "bp", id: "_bpb7" },
    f3: { pce: "wk", id: "_wke1" },
    a6: { pce: "bp", id: "_bpa7" },
  },
  whosTurn: "w",
  players: { w: { uid: "fake", email: "fake" }, b: null },
  turns: [
    "e2e4",
    "g8f6",
    "d2d3",
    "e7e5",
    "d1h5",
    "f6h5",
    "c1g5",
    "d8g5",
    "f2f4",
    "h5f4",
    "g2g3",
    "g5g3",
    "h2g3",
    "f4d3",
    "f1d3",
    "f8c5",
    "b2b4",
    "c5g1",
    "h1h7",
    "e8g8",
    "d3c4",
    "g1f2",
    "e1f2",
    "b8c6",
    "f2f3",
    "g8h7",
    "b4b5",
    "a7a6",
    "b5c6",
    "b7c6",
  ],
  createdAt: 1695709819005,
  updatedAt: 1695709819009,
  castle: {
    b: { queenSideRookMoved: false, kingMoved: true, kingSideRookMoved: false },
    w: { queenSideRookMoved: false, kingMoved: true, kingSideRookMoved: true },
  },
  winner: null,
  game_name: "",
} as GameState;

describe("would moving king into checked state put me in check", () => {
  it("see if check function works", () => {
    const result = wouldThisMovePutMeInCheck({
      move: "f3f4",
      gameState: {
        whosTurn: buggyState.whosTurn,
        boardMap: buggyState.boardMap,
        turns: buggyState.turns,
      },
    });

    expect(result).toBe(true);
  });
});
