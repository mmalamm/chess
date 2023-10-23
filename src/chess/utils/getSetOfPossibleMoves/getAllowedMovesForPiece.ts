import { BoardMap, Coord, GameState, PieceLetter } from "../types";
import { bishopFn } from "./pieceFns/bishopFn";
import { kingFn } from "./pieceFns/kingFn";
import { knightFn } from "./pieceFns/knightFn";
import { pawnFn } from "./pieceFns/pawnFn";
import { queenFn } from "./pieceFns/queenFn";
import { rookFn } from "./pieceFns/rookFn";

type PieceName = (typeof pieceNames)[PieceLetter];

type FnsMap = Record<
  PieceName,
  (
    turn: string,
    gameState: Pick<GameState, "whosTurn" | "turns" | "boardMap" | "castle">
  ) => Set<Coord>
>;

const fns = {
  pawn: pawnFn,
  bishop: bishopFn,
  knight: knightFn,
  king: kingFn,
  rook: rookFn,
  queen: queenFn,
} as FnsMap;

export default function getAllowedMovesForPiece(
  pieceCoord: Coord,
  gameState: Pick<GameState, "whosTurn" | "turns" | "boardMap" | "castle">
): Set<Coord> {
  const { boardMap } = gameState;
  const pieceObject = getPieceFromCoords(pieceCoord, boardMap);
  if (!pieceObject) return new Set();
  const { pieceName } = pieceObject;
  const moves = fns[pieceName](pieceCoord, gameState);
  return moves;
}

const pieceNames = {
  p: "pawn",
  r: "rook",
  h: "knight",
  b: "bishop",
  q: "queen",
  k: "king",
} as const;

function getPieceFromCoords(pieceCoord: Coord, boardMap: BoardMap) {
  const pieceSymbol = boardMap[pieceCoord]?.pce;
  if (!pieceSymbol) return null;
  const pieceLetter = pieceSymbol[1] as "p" | "r" | "h" | "b" | "q" | "k";

  return {
    piece: pieceSymbol,
    coords: pieceCoord,
    pieceName: pieceNames[pieceLetter],
    pieceColor: pieceSymbol[0],
  };
}