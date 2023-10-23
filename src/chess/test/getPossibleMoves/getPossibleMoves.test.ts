import { describe, expect, it } from "vitest";

import { getPossibleMoves } from "@/chess/utils/getSetOfPossibleMoves/getPossibleMoves";
import { GameState } from "@/chess/utils/types";

describe("getPossibleMoves", () => {
  it("lets queen move to kill knight who is checking king", () => {
    const queenMoveFixture: GameState = {
      boardMap: {
        d2: { id: "_wpd2", pce: "wp" },
        c2: { id: "_wpc2", pce: "wp" },
        a1: { pce: "wr", id: "_wra1" },
        e7: { id: "_bpe7", pce: "bp" },
        h2: { pce: "wp", id: "_wph2" },
        a7: { id: "_bpa7", pce: "bp" },
        g2: { pce: "bp", id: "_bpf7" },
        e8: { pce: "bk", id: "_bke8" },
        d7: { id: "_bpd7", pce: "bp" },
        g7: { id: "_bpg7", pce: "bp" },
        h1: { id: "_wrh1", pce: "wr" },
        h3: { pce: "wb", id: "_wbf1" },
        f2: { pce: "wp", id: "_wpf2" },
        h8: { id: "_brh8", pce: "br" },
        g8: { id: "_bhg8", pce: "bh" },
        d1: { id: "_wqd1", pce: "wq" },
        f3: { pce: "wh", id: "_whg1" },
        f8: { pce: "bb", id: "_bbf8" },
        a2: { id: "_wpa2", pce: "wp" },
        b7: { id: "_bpb7", pce: "bp" },
        h7: { pce: "bp", id: "_bph7" },
        d8: { id: "_bqd8", pce: "bq" },
        c7: { pce: "wh", id: "_whb1" },
        e1: { id: "_wke1", pce: "wk" },
        c1: { pce: "wb", id: "_wbc1" },
        c6: { id: "_bhb8", pce: "bh" },
        e2: { id: "_wpe2", pce: "wp" },
        a8: { pce: "br", id: "_bra8" },
        c8: { id: "_bbc8", pce: "bb" },
        b2: { pce: "wp", id: "_wpb2" },
      },
      winner: null,
      whosTurn: "b",
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
      ],
      castle: {
        b: {
          queenSideRookMoved: false,
          kingSideRookMoved: false,
          kingMoved: false,
        },
        w: {
          kingMoved: false,
          queenSideRookMoved: false,
          kingSideRookMoved: false,
        },
      },
    };
    const set = getPossibleMoves("d8", queenMoveFixture);
    expect(set.size).toBe(1);
    expect(set.has("c7")).toBe(true);
  });

  it("lets white bishop kill pawn", () => {
    const whiteBishopUnableToKillPawnFixture: GameState = {
      castle: {
        w: {
          kingMoved: false,
          queenSideRookMoved: false,
          kingSideRookMoved: false,
        },
        b: {
          queenSideRookMoved: false,
          kingSideRookMoved: false,
          kingMoved: false,
        },
      },
      boardMap: {
        h3: { id: "_wbf1", pce: "wb" },
        c6: { id: "_bhb8", pce: "bh" },
        h2: { pce: "wp", id: "_wph2" },
        f8: { pce: "bb", id: "_bbf8" },
        b7: { id: "_bpb7", pce: "bp" },
        g7: { id: "_bpg7", pce: "bp" },
        b2: { pce: "wp", id: "_wpb2" },
        c1: { id: "_wbc1", pce: "wb" },
        g2: { pce: "bp", id: "_bpf7" },
        c7: { pce: "bq", id: "_bqd8" },
        e2: { id: "_wpe2", pce: "wp" },
        e8: { pce: "bk", id: "_bke8" },
        d1: { pce: "wq", id: "_wqd1" },
        a1: { pce: "wr", id: "_wra1" },
        h8: { id: "_brh8", pce: "br" },
        d2: { pce: "wp", id: "_wpd2" },
        c2: { id: "_wpc2", pce: "wp" },
        a8: { id: "_bra8", pce: "br" },
        e7: { pce: "bp", id: "_bpe7" },
        h7: { pce: "bp", id: "_bph7" },
        f2: { id: "_wpf2", pce: "wp" },
        a2: { id: "_wpa2", pce: "wp" },
        c8: { pce: "bb", id: "_bbc8" },
        d7: { pce: "bp", id: "_bpd7" },
        h1: { pce: "wr", id: "_wrh1" },
        e1: { id: "_wke1", pce: "wk" },
        g8: { id: "_bhg8", pce: "bh" },
        f3: { pce: "wh", id: "_whg1" },
        a7: { pce: "bp", id: "_bpa7" },
      },
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
      ],
      winner: null,
      whosTurn: "w",
    };
    const moves = getPossibleMoves("h3", whiteBishopUnableToKillPawnFixture);

    expect(moves.has("d7")).toBe(true);
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
      castle: {
        w: {
          queenSideRookMoved: false,
          kingSideRookMoved: false,
          kingMoved: false,
        },
        b: {
          kingMoved: false,
          kingSideRookMoved: false,
          queenSideRookMoved: false,
        },
      },
      winner: null,
      whosTurn: "b",
      boardMap: {
        d2: { pce: "wp", id: "_wpd2" },
        f2: { id: "_wpf2", pce: "wp" },
        c1: { pce: "wb", id: "_wbc1" },
        g2: { id: "_bpf7", pce: "bp" },
        e8: { id: "_bke8", pce: "bk" },
        a8: { pce: "br", id: "_bra8" },
        c8: { pce: "bb", id: "_bbc8" },
        g7: { pce: "bp", id: "_bpg7" },
        h1: { id: "_wrh1", pce: "wr" },
        f8: { pce: "bb", id: "_bbf8" },
        a1: { id: "_wra1", pce: "wr" },
        h2: { pce: "wp", id: "_wph2" },
        d7: { pce: "wb", id: "_wbf1" },
        b2: { id: "_wpb2", pce: "wp" },
        e2: { pce: "wp", id: "_wpe2" },
        c6: { pce: "bh", id: "_bhb8" },
        a7: { id: "_bpa7", pce: "bp" },
        h7: { pce: "bp", id: "_bph7" },
        c7: { pce: "bq", id: "_bqd8" },
        b7: { pce: "bp", id: "_bpb7" },
        h8: { id: "_brh8", pce: "br" },
        c2: { pce: "wp", id: "_wpc2" },
        d1: { id: "_wqd1", pce: "wq" },
        g8: { pce: "bh", id: "_bhg8" },
        e1: { id: "_wke1", pce: "wk" },
        a2: { id: "_wpa2", pce: "wp" },
        e7: { pce: "bp", id: "_bpe7" },
        f3: { pce: "wh", id: "_whg1" },
      },
    };
    const possibleMoves = getPossibleMoves("e8", fixture);
    expect(possibleMoves.size).toBe(3);

    ["d8", "d7", "f7"].forEach((c) => {
      expect(possibleMoves.has(c)).toBe(true);
    });
  });
});
