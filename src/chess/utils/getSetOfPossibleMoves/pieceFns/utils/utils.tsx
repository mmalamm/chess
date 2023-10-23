import { BoardMap, Coord, GameState, PieceSymbol, PlayerColor } from "@/chess/utils/types";
import { orthogonalFunctions as o } from "./orthogonalFunctions";
import { diagonalFunctions as d } from "./diagonalFunctions";
import getNewBoardMap from "@/chess/utils/processTurn/getNewBoardMap";
import { isThisColorInCheck } from "./isThisColorInCheck";
import { getPossibleMoves } from "../../getPossibleMoves";

export function getEnPassantTurn(
  coordOfPawn: Coord,
  lastTurn: string | undefined,
  color: PlayerColor
) {
  // get possible en passant moves
  if (!lastTurn) return null;
  const enemyColor = color === "b" ? "w" : "b";
  const enPassantMove = [...getFwdAdjacentDiagCoords(coordOfPawn, color)]
    .filter((c) => {
      if (!c) return false;
      const fromCell = getOneCellFwd(c, color);
      if (!fromCell) return false;
      const toCell = getTwoCellsFwd(fromCell, enemyColor);
      return `${fromCell}${toCell}` === lastTurn;
    })
    .pop();

  return enPassantMove || null;
}

export function getFwdAdjacentDiagCoords(coord: Coord, color: PlayerColor) {
  const fns = color === "b" ? [d.a1d, d.h1d] : [d.a8d, d.h8d];
  return new Set(fns.map((f) => f(coord)));
}

export function getOneCellFwd(coord: Coord, color: PlayerColor) {
  const fn = color === "b" ? o.o1 : o.o8;
  return fn(coord);
}

export function getTwoCellsFwd(coord: Coord, color: PlayerColor) {
  const fn = color === "b" ? o.o1 : o.o8;
  return fn(fn(coord));
}

export function hasEnemyPiece(
  coord: Coord,
  { whosTurn: color, boardMap }: Pick<GameState, "whosTurn" | "boardMap">
) {
  const enemyColor = color === "b" ? "w" : "b";
  const piece = boardMap[coord]?.pce;
  return piece && piece[0] === enemyColor;
}

export function wouldThisMovePutMeInCheck({
  move,
  gameState: { whosTurn, boardMap, turns },
}: {
  move: string;
  gameState: Pick<GameState, "boardMap" | "whosTurn" | "turns">;
}) {
  const newBoardMap = getNewBoardMap(move, { boardMap, whosTurn, turns });
  const thisIsInCheck = isThisColorInCheck(whosTurn, newBoardMap);

  if (thisIsInCheck) return true;
  return false;
}

export function isEmpty(cellToCheck: Coord, boardMap: BoardMap) {
  return !boardMap[cellToCheck];
}

export function isHomeRow(coord: Coord, color: PlayerColor) {
  const homeRow = color === "b" ? 7 : 2;
  return +coord[1] === homeRow;
}

export function hasAlliedPiece(
  coord: Coord,
  { whosTurn: color, boardMap }: Pick<GameState, "whosTurn" | "boardMap">
) {
  const piece = boardMap[coord]?.pce;
  return piece && piece[0] === color;
}

const getStraightMoves =
  (
    coord: Coord,
    { boardMap, whosTurn }: Pick<GameState, "whosTurn" | "boardMap">
  ) =>
  (applyChange: (c: Coord | null) => Coord | null) => {
    const output = new Set<Coord>();
    let currentCell = applyChange(coord);
    while (currentCell) {
      if (isEmpty(currentCell, boardMap)) {
        output.add(currentCell);
        currentCell = applyChange(currentCell);
        continue;
      }

      if (hasEnemyPiece(currentCell, { whosTurn, boardMap })) {
        output.add(currentCell);
        break;
      }

      if (hasAlliedPiece(currentCell, { whosTurn, boardMap })) {
        break;
      }
    }
    return output;
  };

export const getDiagonals = (
  coord: Coord,
  { whosTurn, boardMap }: Pick<GameState, "whosTurn" | "boardMap">
) => {
  const f = getStraightMoves(coord, { whosTurn, boardMap });
  const a8 = f(d.a8d);
  const a1 = f(d.a1d);
  const h8 = f(d.h8d);
  const h1 = f(d.h1d);
  return new Set<Coord>([...a1, ...a8, ...h1, ...h8]);
};

export const getOrthogonals = (
  coord: Coord,
  { whosTurn, boardMap }: Pick<GameState, "whosTurn" | "boardMap">
) => {
  const f = getStraightMoves(coord, { whosTurn, boardMap });
  const oa = f(o.oa);
  const o1 = f(o.o1);
  const oh = f(o.oh);
  const o8 = f(o.o8);
  return new Set<Coord>([...oa, ...o1, ...oh, ...o8]);
};

function getCellContent(
  cellCoordStr: Coord,
  boardMap: BoardMap
): PieceSymbol | null {
  return boardMap[cellCoordStr]?.pce || null;
}

export default function isThisColorCheckMated({
  color,
  gameState,
}: {
  color: PlayerColor;
  gameState: Pick<GameState, "boardMap" | "whosTurn" | "turns" | "castle">;
}): boolean {
  const { boardMap } = gameState;
  const isInCheck = isThisColorInCheck(color, boardMap);
  if (!isInCheck) return false;

  for (let l of "abcdefgh") {
    for (let n of "12345678") {
      const x = getCellContent((l + n) as Coord, boardMap);
      if (x && x[0] !== color) continue;
      const s = getPossibleMoves((l + n) as Coord, gameState);
      if (s.size !== 0) return false;
    }
  }

  return true;
}