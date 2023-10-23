import { Coord } from "@/chess/utils/types";
import { orthogonalFunctions as o } from "./orthogonalFunctions";

export const getKnightCoords = (c: Coord): Set<Coord> =>
  new Set(
    [
      o.oa(o.oa(o.o8(c))),
      o.o8(o.o8(o.oa(c))),
      o.oh(o.oh(o.o8(c))),
      o.oh(o.o8(o.o8(c))),
      o.oa(o.oa(o.o1(c))),
      o.o1(o.o1(o.oa(c))),
      o.oh(o.oh(o.o1(c))),
      o.o1(o.o1(o.oh(c))),
    ].filter(Boolean)
  );
