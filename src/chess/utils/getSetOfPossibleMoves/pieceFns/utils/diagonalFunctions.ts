import { Coord } from "@/chess/utils/types";

const letters = "abcdefgh";

const h8d = (coord: Coord | null): Coord | null => {
  if (!coord) return null;
  const [l, n] = coord;
  const newN = +n + 1;
  const newL = letters[letters.indexOf(l) + 1];
  if (!newL || newN > 8) return null;
  return `${newL}${newN}` as Coord;
};
const a1d = (coord: Coord | null): Coord | null => {
  if (!coord) return null;
  const [l, n] = coord;
  const newN = +n - 1;
  const newL = letters[letters.indexOf(l) - 1];
  if (!newL || !newN) return null;
  return `${newL}${newN}` as Coord;
};
const a8d = (coord: Coord | null): Coord | null => {
  if (!coord) return null;
  const [l, n] = coord;
  const newN = +n + 1;
  const newL = letters[letters.indexOf(l) - 1];
  if (!newL || newN > 8) return null;
  return `${newL}${newN}` as Coord;
};
const h1d = (coord: Coord | null): Coord | null => {
  if (!coord) return null;
  const [l, n] = coord;
  const newN = +n - 1;
  const newL = letters[letters.indexOf(l) + 1];
  if (!newL || !newN) return null;
  return `${newL}${newN}` as Coord;
};

export const diagonalFunctions = {
  h1d,
  h8d,
  a1d,
  a8d,
};
