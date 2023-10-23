import { describe, expect, it } from "vitest";

import { BoardMap, GameState } from "../../utils/types";
import { isThisColorInCheck } from "@/chess/utils/getSetOfPossibleMoves/pieceFns/utils/isThisColorInCheck";

describe("isThisColorInCheck test", () => {
  it("should return true if the passed in state and color are in check", () => {
    const foolsMateBoardMapFixture: BoardMap = {
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
      h8: { pce: "br", id: "_brh8" },
      f8: { id: "_bbf8", pce: "bb" },
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
    };
    // const foolsMateTurnsFixture = ["f2f3", "e7e6", "g2g4", "g8h4"];
    const result = isThisColorInCheck("w", foolsMateBoardMapFixture);
    expect(result).toBeTruthy();
  });

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
        d7: { pce: "bk", id: "_bke8" },
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
    const result = isThisColorInCheck("b", fixture.boardMap);

    expect(result).toBe(false);
  });
});
