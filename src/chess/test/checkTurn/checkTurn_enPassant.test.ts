import { describe, expect, it } from "vitest";

import { checkTurn } from "../../utils/checkTurn/checkTurn";

import { GameState } from "../../utils/types";

const whiteShouldBeAllowedToEnPassantGameStateFixture: GameState = {
  winner: null,
  boardMap: {
    b1: { id: "_whb1", pce: "wh" },
    e1: { id: "_wke1", pce: "wk" },
    c2: { pce: "wp", id: "_wpc2" },
    b2: { pce: "wp", id: "_wpb2" },
    f5: { pce: "wp", id: "_wpf2" },
    h7: { id: "_bph7", pce: "bp" },
    e8: { id: "_bke8", pce: "bk" },
    c1: { pce: "wb", id: "_wbc1" },
    d8: { id: "_bqd8", pce: "bq" },
    a1: { id: "_wra1", pce: "wr" },
    a7: { id: "_bpa7", pce: "bp" },
    h1: { id: "_wrh1", pce: "wr" },
    h6: { id: "_bhg8", pce: "bh" },
    b8: { pce: "bh", id: "_bhb8" },
    e5: { id: "_bpe7", pce: "bp" },
    h2: { pce: "wp", id: "_wph2" },
    a8: { id: "_bra8", pce: "br" },
    f1: { pce: "wb", id: "_wbf1" },
    f7: { pce: "bp", id: "_bpf7" },
    g2: { id: "_wpg2", pce: "wp" },
    g7: { id: "_bpg7", pce: "bp" },
    c7: { id: "_bpc7", pce: "bp" },
    a2: { id: "_wpa2", pce: "wp" },
    d1: { id: "_wqd1", pce: "wq" },
    d7: { id: "_bpd7", pce: "bp" },
    c8: { id: "_bbc8", pce: "bb" },
    f8: { pce: "bb", id: "_bbf8" },
    b7: { pce: "bp", id: "_bpb7" },
    h8: { id: "_brh8", pce: "br" },
    g1: { id: "_whg1", pce: "wh" },
    d2: { id: "_wpd2", pce: "wp" },
    e2: { id: "_wpe2", pce: "wp" },
  },
  turns: ["f2f4", "g8h6", "f4f5", "e7e5"],
  castle: {
    b: {
      kingMoved: false,
      queenSideRookMoved: false,
      kingSideRookMoved: false,
    },
    w: {
      kingSideRookMoved: false,
      queenSideRookMoved: false,
      kingMoved: false,
    },
  },
  whosTurn: "w",
};

const blackShouldBeAllowedToEnPassantGameStateFixture: GameState = {
  turns: ["b1c3", "e7e5", "e2e3", "e5e4", "f2f4"],
  castle: {
    b: {
      kingSideRookMoved: false,
      kingMoved: false,
      queenSideRookMoved: false,
    },
    w: {
      queenSideRookMoved: false,
      kingMoved: false,
      kingSideRookMoved: false,
    },
  },
  winner: null,
  whosTurn: "b",
  boardMap: {
    g2: { id: "_wpg2", pce: "wp" },
    a1: { pce: "wr", id: "_wra1" },
    a2: { id: "_wpa2", pce: "wp" },
    d8: { pce: "bq", id: "_bqd8" },
    h8: { pce: "br", id: "_brh8" },
    e1: { id: "_wke1", pce: "wk" },
    d7: { id: "_bpd7", pce: "bp" },
    c2: { pce: "wp", id: "_wpc2" },
    d1: { pce: "wq", id: "_wqd1" },
    f8: { id: "_bbf8", pce: "bb" },
    g7: { id: "_bpg7", pce: "bp" },
    g8: { pce: "bh", id: "_bhg8" },
    a7: { pce: "bp", id: "_bpa7" },
    b7: { id: "_bpb7", pce: "bp" },
    a8: { id: "_bra8", pce: "br" },
    g1: { pce: "wh", id: "_whg1" },
    c8: { pce: "bb", id: "_bbc8" },
    b8: { pce: "bh", id: "_bhb8" },
    h1: { pce: "wr", id: "_wrh1" },
    f7: { id: "_bpf7", pce: "bp" },
    c1: { pce: "wb", id: "_wbc1" },
    f4: { pce: "wp", id: "_wpf2" },
    e3: { id: "_wpe2", pce: "wp" },
    h2: { id: "_wph2", pce: "wp" },
    c3: { pce: "wh", id: "_whb1" },
    b2: { pce: "wp", id: "_wpb2" },
    c7: { id: "_bpc7", pce: "bp" },
    d2: { id: "_wpd2", pce: "wp" },
    h7: { id: "_bph7", pce: "bp" },
    f1: { id: "_wbf1", pce: "wb" },
    e8: { id: "_bke8", pce: "bk" },
    e4: { id: "_bpe7", pce: "bp" },
  },
};

const blackShouldNotBeAllowedToEnPassantIfWhitePawnDidntMoveTwoSquaresLastTurn: GameState =
  {
    turns: ["b1c3", "e7e5", "e2e3", "e5e4", "f2f4", "b7b5", "c3d5"],
    boardMap: {
      c8: { id: "_bbc8", pce: "bb" },
      b5: { id: "_bpb7", pce: "bp" },
      h8: { pce: "br", id: "_brh8" },
      f4: { id: "_wpf2", pce: "wp" },
      g1: { id: "_whg1", pce: "wh" },
      c2: { pce: "wp", id: "_wpc2" },
      h1: { pce: "wr", id: "_wrh1" },
      h2: { pce: "wp", id: "_wph2" },
      h7: { id: "_bph7", pce: "bp" },
      d8: { id: "_bqd8", pce: "bq" },
      b2: { pce: "wp", id: "_wpb2" },
      a7: { pce: "bp", id: "_bpa7" },
      a2: { id: "_wpa2", pce: "wp" },
      c1: { id: "_wbc1", pce: "wb" },
      e4: { pce: "bp", id: "_bpe7" },
      e8: { id: "_bke8", pce: "bk" },
      c7: { id: "_bpc7", pce: "bp" },
      a1: { id: "_wra1", pce: "wr" },
      a8: { id: "_bra8", pce: "br" },
      b8: { id: "_bhb8", pce: "bh" },
      f1: { id: "_wbf1", pce: "wb" },
      g2: { pce: "wp", id: "_wpg2" },
      d1: { id: "_wqd1", pce: "wq" },
      e3: { id: "_wpe2", pce: "wp" },
      g8: { id: "_bhg8", pce: "bh" },
      d2: { pce: "wp", id: "_wpd2" },
      g7: { id: "_bpg7", pce: "bp" },
      e1: { pce: "wk", id: "_wke1" },
      f7: { id: "_bpf7", pce: "bp" },
      d5: { pce: "wh", id: "_whb1" },
      f8: { id: "_bbf8", pce: "bb" },
      d7: { pce: "bp", id: "_bpd7" },
    },
    winner: null,
    castle: {
      w: {
        kingSideRookMoved: false,
        kingMoved: false,
        queenSideRookMoved: false,
      },
      b: {
        kingMoved: false,
        kingSideRookMoved: false,
        queenSideRookMoved: false,
      },
    },
    whosTurn: "b",
  };

describe("checkTurn_enPassant", () => {
  it("returns true for valid white en passant move", () => {
    const result = checkTurn({
      turn: "f5e6",
      gameData: whiteShouldBeAllowedToEnPassantGameStateFixture,
    });
    expect(result).toBe(true);
  });

  it("returns true for valid black en passant move", () => {
    const result = checkTurn({
      turn: "e4f3",
      gameData: blackShouldBeAllowedToEnPassantGameStateFixture,
    });
    expect(result).toBe(true);
  });

  it("black Should Not Be Allowed To En Passant If White Pawn Didnt Move Two Squares Last Turn", () => {
    const result = checkTurn({
      turn: "e4f3",
      gameData:
        blackShouldNotBeAllowedToEnPassantIfWhitePawnDidntMoveTwoSquaresLastTurn,
    });
    expect(result).toBe(false);
  });
});
