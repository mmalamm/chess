import { describe, expect, it } from "vitest";

import { diagonalFunctions as d } from "@/chess/utils/getSetOfPossibleMoves/pieceFns/utils/diagonalFunctions";

describe("diag fns", () => {
  it("da1 (diagonal_towards_a1)", () => {
    expect(d.a1d("e6")).toBe("d5");
    expect(d.a1d("d1")).toBe(null);
    expect(d.a1d("a1")).toBe(null);
    expect(d.a1d("a3")).toBe(null);
    expect(d.a1d("h8")).toBe("g7");
  });
  it("dh1 (diagonal_towards_h1)", () => {
    expect(d.h1d("h8")).toBe(null);
    expect(d.h1d("h1")).toBe(null);
    expect(d.h1d("c1")).toBe(null);
    expect(d.h1d("a1")).toBe(null);
    expect(d.h1d("e5")).toBe("f4");
    expect(d.h1d("a7")).toBe("b6");
  });
  it("da8 (diagonal_towards_a8)", () => {
    expect(d.a8d("h8")).toBe(null);
    expect(d.a8d("h1")).toBe("g2");
    expect(d.a8d("c1")).toBe("b2");
    expect(d.a8d("a1")).toBe(null);
    expect(d.a8d("e5")).toBe("d6");
    expect(d.a8d("a7")).toBe(null);
  });
  it("dh8 (diagonal_towards_h8)", () => {
    expect(d.h8d("h8")).toBe(null);
    expect(d.h8d("h1")).toBe(null);
    expect(d.h8d("c1")).toBe("d2");
    expect(d.h8d("a1")).toBe("b2");
    expect(d.h8d("e5")).toBe("f6");
    expect(d.h8d("a7")).toBe("b8");
  });
});
