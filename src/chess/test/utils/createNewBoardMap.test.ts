import { createNewBoardMap } from "@/chess/utils/helpers";
import { describe, expect, it } from "vitest";

describe("createNewBoardMap", () => {
  it("creates new board map", () => {
    const nbm = createNewBoardMap();
    expect(Object.entries(nbm)).toHaveLength(16 * 2);
    expect(nbm.a1?.pce).toBe("wr");
    expect(nbm.a1?.id).toBe("_wra1");

    expect(nbm.b1?.pce).toBe("wh");
    expect(nbm.c1?.pce).toBe("wb");
  });
});
