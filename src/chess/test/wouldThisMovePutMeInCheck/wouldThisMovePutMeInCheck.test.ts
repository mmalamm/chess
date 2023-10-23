import { describe, expect, it } from "vitest";

import { wouldThisMovePutMeInCheck } from "../../utils/getSetOfPossibleMoves/pieceFns/utils/utils";
import { GameState } from "../../utils/types";

describe("wouldThisMovePutMeInCheck", () => {
  it("lets king kill white bishop to excape itself from check", () => {
    const fixture: GameState = {
      turns: [
        "b1c3",
        "f7f5",
        "g1f3",
        "f5f4",
        "g2g4",
        "f4g3",
        "f1h3",
        "b8c6",
        "c3d5",
        "g3g2",
        "d5c7",
        "d8c7",
        "h3d7",
      ],
      boardMap: {
        d1: { pce: "wq", id: "_wqd1" },
        d7: { pce: "wb", id: "_wbf1" },
        a2: { pce: "wp", id: "_wpa2" },
        e2: { id: "_wpe2", pce: "wp" },
        g2: { pce: "bp", id: "_bpf7" },
        h2: { id: "_wph2", pce: "wp" },
        f8: { id: "_bbf8", pce: "bb" },
        h7: { pce: "bp", id: "_bph7" },
        g7: { id: "_bpg7", pce: "bp" },
        c8: { pce: "bb", id: "_bbc8" },
        a7: { id: "_bpa7", pce: "bp" },
        c1: { pce: "wb", id: "_wbc1" },
        a1: { id: "_wra1", pce: "wr" },
        c2: { pce: "wp", id: "_wpc2" },
        b7: { id: "_bpb7", pce: "bp" },
        a8: { pce: "br", id: "_bra8" },
        e8: { pce: "bk", id: "_bke8" },
        f2: { id: "_wpf2", pce: "wp" },
        h8: { pce: "br", id: "_brh8" },
        b2: { pce: "wp", id: "_wpb2" },
        e7: { pce: "bp", id: "_bpe7" },
        h1: { id: "_wrh1", pce: "wr" },
        c7: { id: "_bqd8", pce: "bq" },
        e1: { pce: "wk", id: "_wke1" },
        g8: { id: "_bhg8", pce: "bh" },
        d2: { id: "_wpd2", pce: "wp" },
        c6: { id: "_bhb8", pce: "bh" },
        f3: { pce: "wh", id: "_whg1" },
      },
      winner: null,
      whosTurn: "b",
      castle: {
        b: {
          queenSideRookMoved: false,
          kingSideRookMoved: false,
          kingMoved: false,
        },
        w: {
          kingSideRookMoved: false,
          kingMoved: false,
          queenSideRookMoved: false,
        },
      },
    };
    const turn = "e8d7";
    const result = wouldThisMovePutMeInCheck({
      move: turn,
      gameState: fixture,
    });

    expect(result).toBe(false);
  });
});
