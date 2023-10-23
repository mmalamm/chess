import { describe, expect, it } from "vitest";

import { checkTurn } from "@/chess/utils/checkTurn/checkTurn";
import { GameState } from "@/chess/utils/types";

const gameState: GameState = {
  whosTurn: "b",
  boardMap: {
    f8: { id: "_bbf8", pce: "bb" },
    h7: { id: "_bph7", pce: "bp" },
    e5: { id: "_bpe7", pce: "bp" },
    b7: { id: "_bpb7", pce: "bp" },
    e1: { id: "_wke1", pce: "wk" },
    c7: { pce: "bp", id: "_bpc7" },
    a1: { id: "_wra1", pce: "wr" },
    b2: { pce: "wp", id: "_wpb2" },
    a2: { pce: "wp", id: "_wpa2" },
    g7: { id: "_bpg7", pce: "bp" },
    b8: { id: "_bhb8", pce: "bh" },
    h2: { id: "_wph2", pce: "wp" },
    h8: { pce: "br", id: "_brh8" },
    g8: { pce: "bh", id: "_bhg8" },
    f2: { pce: "wp", id: "_wpf2" },
    g5: { id: "_wbc1", pce: "wb" },
    e2: { pce: "wp", id: "_wpe2" },
    c2: { id: "_wpc2", pce: "wp" },
    d8: { pce: "bk", id: "_bke8" },
    h1: { id: "_wrh1", pce: "wr" },
    a7: { pce: "bp", id: "_bpa7" },
    c4: { pce: "bp", id: "_bpd7" },
    g4: { id: "_wbf1", pce: "wb" },
    f7: { id: "_bpf7", pce: "bp" },
    a8: { pce: "br", id: "_bra8" },
  },
  winner: null,
  turns: [
    "g2g4",
    "d7d5",
    "f1h3",
    "c8e6",
    "g1f3",
    "d8d6",
    "f3e5",
    "d6e5",
    "b1c3",
    "e5c3",
    "d2c3",
    "e6g4",
    "h3g4",
    "e7e5",
    "c3c4",
    "d5c4",
    "d1d8",
    "e8d8",
    "c1g5",
  ],
  castle: {
    w: {
      queenSideRookMoved: false,
      kingMoved: false,
      kingSideRookMoved: false,
    },
    b: { queenSideRookMoved: false, kingMoved: true, kingSideRookMoved: false },
  },
};
const turn = "f8e7";
describe("checkTurn black checked edge case", () => {
  it("black is checked but should be able to move bishop to block check", () => {
    const result = checkTurn({ turn, gameData: gameState });
    expect(result).toBe(true);
  });
});
