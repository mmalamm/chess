import { getOneCellFwd } from "../getSetOfPossibleMoves/pieceFns/utils/utils";
import { dd, isPromotionTurn, splitTurn } from "../helpers";
import { BoardMap, GameState, PieceSymbol } from "../types";
import isEnPassantMove from "./isEnPassantMove";

export default function getNewBoardMap(
  turn: string,
  {
    boardMap,
    whosTurn,
    turns,
  }: Pick<GameState, "boardMap" | "whosTurn" | "turns">
): BoardMap {
  if (isPromotionTurn(turn, { boardMap, whosTurn })) {
    return applyPromotionTurn(turn, { boardMap, whosTurn });
  }

  if (isEnPassantMove(turn, { boardMap, turns })) {
    return applyEnPassantTurn(turn, { boardMap });
  }

  const applyTurn = isCastleMove(turn, { whosTurn, boardMap })
    ? applyCastleTurn
    : applyNormalTurn;

  return applyTurn(turn, { boardMap, whosTurn });
}

function applyEnPassantTurn(
  turn: string,
  { boardMap }: Pick<GameState, "boardMap">
): BoardMap {
  const newBoardMap = dd(boardMap) as BoardMap;
  const { to, from } = splitTurn(turn);

  const colorOfPawnBeingKilled = boardMap[from]?.pce[0] === "b" ? "w" : "b";
  const coordOfPawnToKill = getOneCellFwd(to, colorOfPawnBeingKilled);
  if (!coordOfPawnToKill) throw new Error("should be unreachable");
  const pieceToMove = newBoardMap[from];

  delete newBoardMap[coordOfPawnToKill];
  delete newBoardMap[from];
  newBoardMap[to] = pieceToMove;

  return newBoardMap;
}

function applyPromotionTurn(
  turn: string,
  { boardMap, whosTurn }: Pick<GameState, "boardMap" | "whosTurn">
): BoardMap {
  /// and this
  // move piece to cell and apply promotion to piece
  const newBoardMap = dd(boardMap) as BoardMap;
  const { to, from, promotion } = splitTurn(turn);
  const pieceToPromote = newBoardMap[from];
  const promotionPiece = promotion || "q";
  const currentColor = whosTurn;

  if (!pieceToPromote) throw new Error("there must be a piece to promote");
  /// at some point figure out how to typecast this properly
  pieceToPromote.pce = (currentColor + promotionPiece) as PieceSymbol;

  delete newBoardMap[from];
  newBoardMap[to] = pieceToPromote;
  return newBoardMap;
}

const castleMovesMap = {
  w: ["e1c1", "e1g1"],
  b: ["e8c8", "e8g8"],
};

export function isCastleMove(
  turn: string,
  { whosTurn, boardMap }: Pick<GameState, "whosTurn" | "boardMap">
) {
  const castleMoves = castleMovesMap[whosTurn];
  const kingCell = whosTurn === "w" ? "e1" : "e8";
  if (!castleMoves.includes(turn)) return false;
  if (boardMap[kingCell]?.pce[1] !== "k") return false;
  return true;
}

function applyCastleTurn(
  turn: string,
  { boardMap, whosTurn }: Pick<GameState, "boardMap" | "whosTurn">
): BoardMap {
  const { to, from } = splitTurn(turn);
  const newBoardMap: BoardMap = dd(boardMap);
  const currentKing = boardMap[from];
  delete newBoardMap[from];
  newBoardMap[to] = currentKing;

  if (isQueenSideCastle(turn, { whosTurn })) {
    const rookFromCoords = whosTurn === "w" ? "a1" : "a8";
    const rookToCoords = whosTurn === "w" ? "d1" : "d8";
    const rook = boardMap[rookFromCoords];
    delete newBoardMap[rookFromCoords];
    newBoardMap[rookToCoords] = rook;
    return newBoardMap;
  }

  const rookFromCoords = whosTurn === "w" ? "h1" : "h8";
  const rookToCoords = whosTurn === "w" ? "f1" : "f8";
  const rook = boardMap[rookFromCoords];
  delete newBoardMap[rookFromCoords];
  newBoardMap[rookToCoords] = rook;
  return newBoardMap;
}

function isQueenSideCastle(
  turn: string,
  { whosTurn }: Pick<GameState, "whosTurn">
): boolean {
  const queenSideCastleTurn = whosTurn === "w" ? "e1c1" : "e8c8";
  return turn === queenSideCastleTurn;
}

function applyNormalTurn(
  turn: string,
  { boardMap }: Pick<GameState, "boardMap">
): BoardMap {
  const newBoardMap: BoardMap = dd(boardMap);
  const { to, from } = splitTurn(turn);

  const movingPiece = boardMap[from];
  delete newBoardMap[from];
  newBoardMap[to] = movingPiece;

  return newBoardMap;
}
