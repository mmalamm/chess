import { describe, expect, it } from "vitest";

import { GameState } from "@/chess/utils/types";
import { isThisColorInCheck } from "@/chess/utils/getSetOfPossibleMoves/pieceFns/utils/isThisColorInCheck";

const gameStateFixture: GameState = {
  castle: {
    b: { kingSideRookMoved: false, queenSideRookMoved: false, kingMoved: true },
    w: {
      kingSideRookMoved: false,
      queenSideRookMoved: false,
      kingMoved: false,
    },
  },
  whosTurn: "b",
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
  boardMap: {
    e1: { pce: "wk", id: "_wke1" },
    b2: { pce: "wp", id: "_wpb2" },
    b7: { id: "_bpb7", pce: "bp" },
    h7: { pce: "bp", id: "_bph7" },
    g4: { id: "_wbf1", pce: "wb" },
    b8: { id: "_bhb8", pce: "bh" },
    a2: { id: "_wpa2", pce: "wp" },
    a8: { id: "_bra8", pce: "br" },
    c7: { pce: "bp", id: "_bpc7" },
    c2: { id: "_wpc2", pce: "wp" },
    g7: { id: "_bpg7", pce: "bp" },
    d8: { id: "_bke8", pce: "bk" },
    h8: { pce: "br", id: "_brh8" },
    e2: { id: "_wpe2", pce: "wp" },
    c4: { pce: "bp", id: "_bpd7" },
    g8: { pce: "bh", id: "_bhg8" },
    a1: { id: "_wra1", pce: "wr" },
    e5: { id: "_bpe7", pce: "bp" },
    g5: { pce: "wb", id: "_wbc1" },
    h1: { id: "_wrh1", pce: "wr" },
    f2: { pce: "wp", id: "_wpf2" },
    f7: { id: "_bpf7", pce: "bp" },
    e7: { pce: "bb", id: "_bbf8" },
    a7: { id: "_bpa7", pce: "bp" },
    h2: { pce: "wp", id: "_wph2" },
  },
};

describe("check bug i found", () => {
  it("works", () => {
    const result = isThisColorInCheck("b", gameStateFixture.boardMap);

    expect(result).toBe(false);
  });
});
