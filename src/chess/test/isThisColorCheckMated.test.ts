import isThisColorCheckMated from "../utils/getSetOfPossibleMoves/pieceFns/utils/utils";
import { GameState } from "../utils/types";

import { describe, it, expect } from "vitest";

const whiteCheckMatedGameStateFixture: GameState = {
  boardMap: {
    a7: { pce: "bp", id: "_bpa7" },
    e1: { pce: "wk", id: "_wke1" },
    h7: { id: "_bph7", pce: "bp" },
    a2: { pce: "wp", id: "_wpa2" },
    g8: { pce: "bh", id: "_bhg8" },
    b7: { pce: "bp", id: "_bpb7" },
    c7: { pce: "bp", id: "_bpc7" },
    e2: { id: "_wpe2", pce: "wp" },
    d7: { pce: "bp", id: "_bpd7" },
    a8: { id: "_bra8", pce: "br" },
    g7: { id: "_bpg7", pce: "bp" },
    f8: { id: "_bbf8", pce: "bb" },
    h8: { pce: "br", id: "_brh8" },
    g1: { id: "_whg1", pce: "wh" },
    b8: { pce: "bh", id: "_bhb8" },
    g4: { id: "_wpg2", pce: "wp" },
    e8: { pce: "bk", id: "_bke8" },
    h2: { pce: "wp", id: "_wph2" },
    f1: { id: "_wbf1", pce: "wb" },
    h1: { id: "_wrh1", pce: "wr" },
    f7: { pce: "bp", id: "_bpf7" },
    h4: { id: "_bqd8", pce: "bq" },
    c2: { pce: "wp", id: "_wpc2" },
    f3: { id: "_wpf2", pce: "wp" },
    b1: { id: "_whb1", pce: "wh" },
    e6: { id: "_bpe7", pce: "bp" },
    c1: { id: "_wbc1", pce: "wb" },
    b2: { pce: "wp", id: "_wpb2" },
    a1: { id: "_wra1", pce: "wr" },
    c8: { id: "_bbc8", pce: "bb" },
    d2: { pce: "wp", id: "_wpd2" },
    d1: { pce: "wq", id: "_wqd1" },
  },
  whosTurn: "w",
  castle: {
    w: {
      queenSideRookMoved: false,
      kingMoved: false,
      kingSideRookMoved: false,
    },
    b: {
      queenSideRookMoved: false,
      kingMoved: false,
      kingSideRookMoved: false,
    },
  },
  winner: null,
  turns: ["f2f3", "e7e6", "g2g4", "d8h4"],
};

describe("isThisColorCheckMated test", () => {
  it("fools mate should return true", () => {
    expect(
      isThisColorCheckMated({
        color: "w",
        gameState: whiteCheckMatedGameStateFixture,
      })
    ).toBe(true);
  });
});
