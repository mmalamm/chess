import { expect, it } from "vitest";

import { getPossibleMoves } from "@/chess/utils/getSetOfPossibleMoves/getPossibleMoves";
import { GameState } from "@/chess/utils/types";

const buggyState: GameState = {
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
  castle: {
    b: { queenSideRookMoved: false, kingMoved: true, kingSideRookMoved: false },
    w: { queenSideRookMoved: false, kingMoved: true, kingSideRookMoved: true },
  },
  winner: null,
};

it("buggy state: allows king to move into checked cell", () => {
  const s = getPossibleMoves("f3", buggyState);

  expect(s.has("f4")).toBe(false);
});
