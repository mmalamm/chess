import { describe, expect, it } from "vitest";
import { orthogonalFunctions as o } from "@/chess/utils/getSetOfPossibleMoves/pieceFns/utils/orthogonalFunctions";

describe("ortho fns", () => {
  it("oa (orthogonal_towards_a)", () => {
    expect(o.oa("e5")).toBe("d5");
    expect(o.oa("h8")).toBe("g8");
    expect(o.oa("a3")).toBe(null);
    expect(o.oa("d5")).toBe("c5");
  });
  it("oh (orthogonal_towards_h)", () => {
    expect(o.oh("e5")).toBe("f5");
    expect(o.oh("h8")).toBe(null);
    expect(o.oh("a3")).toBe("b3");
    expect(o.oh("d5")).toBe("e5");
  });
  it("o1 (orthogonal_towards_1)", () => {
    expect(o.o1("e5")).toBe("e4");
    expect(o.o1("h8")).toBe("h7");
    expect(o.o1("a3")).toBe("a2");
    expect(o.o1("c1")).toBe(null);
  });
  it("o8 (orthogonal_towards_8)", () => {
    expect(o.o8("e5")).toBe("e6");
    expect(o.o8("h8")).toBe(null);
    expect(o.o8("a3")).toBe("a4");
    expect(o.o8("d5")).toBe("d6");
  });
});
