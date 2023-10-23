import { describe, expect, it } from "vitest";

import { checkTurn } from "../../utils/checkTurn/checkTurn";

import { GameState } from "../../utils/types";

describe("checkTurn_castling", () => {
  it("returns true for valid white queen side castling move turn", () => {
    const castlingAllowedOnWhiteQueenSideFixture: GameState = {
      boardMap: {
        h2: { id: "_wph2", pce: "wp" },
        d8: { id: "_bqd8", pce: "bq" },
        e3: { pce: "wb", id: "_wbc1" },
        c2: { pce: "wp", id: "_wpc2" },
        e7: { id: "_bpe7", pce: "bp" },
        e2: { id: "_wpe2", pce: "wp" },
        b8: { id: "_bhb8", pce: "bh" },
        d6: { id: "_bpd7", pce: "bp" },
        a7: { id: "_bpa7", pce: "bp" },
        d2: { id: "_wqd1", pce: "wq" },
        h8: { pce: "br", id: "_brh8" },
        f8: { pce: "bb", id: "_bbf8" },
        e8: { id: "_bke8", pce: "bk" },
        d3: { id: "_wpd2", pce: "wp" },
        a1: { pce: "wr", id: "_wra1" },
        f6: { pce: "bh", id: "_bhg8" },
        f7: { pce: "bp", id: "_bpf7" },
        h7: { pce: "bp", id: "_bph7" },
        b2: { id: "_wpb2", pce: "wp" },
        g2: { id: "_wpg2", pce: "wp" },
        b6: { pce: "bp", id: "_bpb7" },
        e6: { pce: "bb", id: "_bbc8" },
        a8: { pce: "br", id: "_bra8" },
        f1: { pce: "wb", id: "_wbf1" },
        e1: { pce: "wk", id: "_wke1" },
        f2: { id: "_wpf2", pce: "wp" },
        h1: { pce: "wr", id: "_wrh1" },
        a2: { id: "_wpa2", pce: "wp" },
        g7: { pce: "bp", id: "_bpg7" },
        a3: { id: "_whb1", pce: "wh" },
        g1: { pce: "wh", id: "_whg1" },
        c7: { pce: "bp", id: "_bpc7" },
      },
      castle: {
        w: {
          queenSideRookMoved: false,
          kingMoved: false,
          kingSideRookMoved: false,
        },
        b: {
          kingSideRookMoved: false,
          queenSideRookMoved: false,
          kingMoved: false,
        },
      },
      winner: null,
      turns: ["d2d3", "g8f6", "c1e3", "d7d6", "b1a3", "c8e6", "d1d2", "b7b6"],
      whosTurn: "w",
    };
    const turn = "e1c1";
    const result = checkTurn({
      turn,
      gameData: castlingAllowedOnWhiteQueenSideFixture,
    });

    expect(result).toBe(true);
  });
  it("returns true for valid white king side castling move turn", () => {
    const castlingAllowedOnWhiteKingSideFixture: GameState = {
      boardMap: {
        a8: { id: "_bra8", pce: "br" },
        h7: { pce: "bp", id: "_bph7" },
        g4: { pce: "wp", id: "_wpg2" },
        c2: { pce: "wp", id: "_wpc2" },
        b1: { id: "_whb1", pce: "wh" },
        b2: { pce: "wp", id: "_wpb2" },
        a2: { id: "_wpa2", pce: "wp" },
        d1: { pce: "wq", id: "_wqd1" },
        g7: { pce: "bp", id: "_bpg7" },
        f3: { id: "_whg1", pce: "wh" },
        c1: { id: "_wbc1", pce: "wb" },
        d2: { id: "_wpd2", pce: "wp" },
        d5: { id: "_bpd7", pce: "bp" },
        e2: { pce: "wp", id: "_wpe2" },
        a1: { id: "_wra1", pce: "wr" },
        e8: { pce: "bk", id: "_bke8" },
        c7: { pce: "bp", id: "_bpc7" },
        h8: { id: "_brh8", pce: "br" },
        h3: { id: "_wbf1", pce: "wb" },
        b7: { pce: "bp", id: "_bpb7" },
        e1: { pce: "wk", id: "_wke1" },
        e6: { pce: "bb", id: "_bbc8" },
        a7: { id: "_bpa7", pce: "bp" },
        b8: { pce: "bh", id: "_bhb8" },
        e7: { id: "_bpe7", pce: "bp" },
        f7: { id: "_bpf7", pce: "bp" },
        f2: { id: "_wpf2", pce: "wp" },
        g8: { pce: "bh", id: "_bhg8" },
        h1: { id: "_wrh1", pce: "wr" },
        f8: { id: "_bbf8", pce: "bb" },
        h2: { id: "_wph2", pce: "wp" },
        d6: { pce: "bq", id: "_bqd8" },
      },
      turns: ["g2g4", "d7d5", "f1h3", "c8e6", "g1f3", "d8d6"],
      whosTurn: "w",
      winner: null,
      castle: {
        w: {
          kingMoved: false,
          kingSideRookMoved: false,
          queenSideRookMoved: false,
        },
        b: {
          queenSideRookMoved: false,
          kingSideRookMoved: false,
          kingMoved: false,
        },
      },
    };
    const turn = "e1g1";
    const result = checkTurn({
      turn,
      gameData: castlingAllowedOnWhiteKingSideFixture,
    });
    expect(result).toBe(true);
  });
  it.skip("returns false for invalid white queen side castling due to check in intermediate cell", () => {});
  it.skip("returns false for invalid white king side castling due to check in intermediate cell", () => {});
  it.skip("returns false for invalid white queen side castling due to rook having moved", () => {});
  it.skip("returns false for invalid white king side castling due to rook having moved", () => {});
  it.skip("returns false for invalid white castling due to king having moved", () => {});

  it.skip("returns true for valid black queen side castling move turn", () => {});
  it.skip("returns true for valid black king side castling move turn", () => {});
  it.skip("returns false for invalid black queen side castling due to check in intermediate cell", () => {});
  it.skip("returns false for invalid black king side castling due to check in intermediate cell", () => {});
  it.skip("returns false for invalid black queen side castling due to rook having moved", () => {});
  it.skip("returns false for invalid black king side castling due to rook having moved", () => {});
  it.skip("returns false for invalid black castling due to king having moved", () => {});
});
