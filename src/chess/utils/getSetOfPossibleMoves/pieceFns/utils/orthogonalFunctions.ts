import { Coord } from "@/chess/utils/types";

const letters = "abcdefgh";

const o8 = (coord: Coord | null): Coord | null => {
  if (!coord) return null;
  const [l, n] = coord;
  const newN = +n + 1;
  if (newN > 8) return null;
  return `${l}${newN}` as Coord;
};
const o1 = (coord: Coord | null): Coord | null => {
  if (!coord) return null;
  const [l, n] = coord;
  const newN = +n - 1;
  if (!newN) return null;
  return `${l}${newN}` as Coord;
};
const oa = (coord: Coord | null): Coord | null => {
  if (!coord) return null;
  const [l, n] = coord;
  const newL = letters[letters.indexOf(l) - 1];
  if (!newL) return null;
  return `${newL}${n}` as Coord;
};
const oh = (coord: Coord | null): Coord | null => {
  if (!coord) return null;
  const [l, n] = coord;
  const newL = letters[letters.indexOf(l) + 1];
  if (!newL) return null;
  return `${newL}${n}` as Coord;
};

export const orthogonalFunctions = {
  o1,
  o8,
  oa,
  oh,
};
