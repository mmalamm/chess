import { isThisColorInCheck } from "./getSetOfPossibleMoves/pieceFns/utils/isThisColorInCheck";
import {
  getTwoCellsFwd,
  isHomeRow,
} from "./getSetOfPossibleMoves/pieceFns/utils/utils";
import { isCastleMove } from "./processTurn/getNewBoardMap";
import isEnPassantMove from "./processTurn/isEnPassantMove";
import { processTurn } from "./processTurn/processTurn";
import {
  BoardMap,
  Coord,
  CoordLetter,
  CoordNumber,
  GameState,
  PlayerColor,
  PromotionOptions,
  TurnDetail,
  TurnString,
} from "./types";

export const dd = <T>(o: T): T => JSON.parse(JSON.stringify(o)) as T;

const getRowCoord = ({ rowIdx }: { rowIdx: number }): CoordNumber =>
  +"87654321"[rowIdx] as CoordNumber;
const getCellCoord = ({ cellIdx }: { cellIdx: number }): CoordLetter =>
  "abcdefgh"[cellIdx] as CoordLetter;
const getCellCoords = ({
  cellIdx,
  rowIdx,
}: {
  cellIdx: number;
  rowIdx: number;
}): Coord => {
  const cellCoord = getCellCoord({ cellIdx });
  const rowCoord = getRowCoord({ rowIdx });
  const coord = `${cellCoord}${rowCoord}` as Coord;
  return coord;
};

export const splitTurn = (turnString: string) => {
  const from = turnString.slice(0, 2) as Coord;
  const to = turnString.slice(2, 4) as Coord;
  const parts = turnString.split("_");
  const promotion = parts[1]?.[0] as PromotionOptions | undefined;

  return {
    from,
    to,
    promotion,
  };
};

export function isPromotionTurn(
  turn: string,
  gameData: Pick<GameState, "whosTurn" | "boardMap">
): boolean {
  // check to see if the move is pawn to a terminal cell
  const whosTurn = gameData.whosTurn;
  const terminalRow = whosTurn === "b" ? "1" : "8";
  const penUltimateRow = terminalRow === "1" ? "2" : "7";
  const { from: fromCell, to: toCell } = splitTurn(turn);
  const isPawn = gameData.boardMap[fromCell]?.pce[1] === "p";
  const isComingFromPenultimateRow = fromCell[1] === penUltimateRow;
  const isTerminalRow = toCell[1] === terminalRow;
  return isPawn && isTerminalRow && isComingFromPenultimateRow;
}

export function createNewCastleState() {
  return {
    queenSideRookMoved: false,
    kingMoved: false,
    kingSideRookMoved: false,
  };
}

export const createNewGame = (): GameState => {
  return {
    whosTurn: "w",
    boardMap: createNewBoardMap(),
    castle: {
      b: createNewCastleState(),
      w: createNewCastleState(),
    },
    turns: [],
    winner: null,
  };
};

export function createNewBoardMap() {
  return transform2DBoardArrayIntoTree(createNewBoard());
}

function createNewBoard() {
  return [
    ["br", "bh", "bb", "bq", "bk", "bb", "bh", "br"],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    ["ee", "ee", "ee", "ee", "ee", "ee", "ee", "ee"],
    ["ee", "ee", "ee", "ee", "ee", "ee", "ee", "ee"],
    ["ee", "ee", "ee", "ee", "ee", "ee", "ee", "ee"],
    ["ee", "ee", "ee", "ee", "ee", "ee", "ee", "ee"],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    ["wr", "wh", "wb", "wq", "wk", "wb", "wh", "wr"],
  ] as const;
}

function transform2DBoardArrayIntoTree(
  board: ReturnType<typeof createNewBoard>
) {
  const o = {} as BoardMap;
  board.forEach((row, rowIdx) => {
    row.forEach((c, cellIdx) => {
      if (c !== "ee") {
        o[getCellCoords({ cellIdx, rowIdx })] = {
          pce: c,
          id: "_" + c + getCellCoords({ cellIdx, rowIdx }),
        };
      }
    });
  });
  return o;
}

export function processUndo(
  detailedTurn: TurnDetail,
  currentGameState: GameState
) {
  const newGameData = dd(currentGameState);

  const newWhosTurn = newGameData.whosTurn === "b" ? "w" : "b";
  newGameData.whosTurn = newWhosTurn;

  newGameData.turns = currentGameState.turns.slice(0, -1);

  newGameData.castle = detailedTurn.castle;

  newGameData.boardMap = detailedTurn.boardMap;

  newGameData.winner = null;

  return newGameData;
}

export function wasTheLastMoveTwoSquarePawnMove(
  lastTurn: string,
  { boardMap }: Pick<GameState, "boardMap">
) {
  const { to, from } = splitTurn(lastTurn);
  const isPawn = boardMap[to]?.pce[1] === "p";
  const turnPlayersColor = boardMap[to]?.pce[0] as PlayerColor;
  const isTwoCellsFwd = getTwoCellsFwd(from, turnPlayersColor) === to;
  const isFromCellHomeRow = isHomeRow(from, turnPlayersColor);
  return isPawn && isTwoCellsFwd && isFromCellHomeRow;
}

export const getDetailedTurns = (turns: TurnString[]): TurnDetail[] => {
  let fakeGame = createNewGame();
  const detailedTurns: TurnDetail[] = [];

  for (let turn of turns) {
    const turnDetail = renderTurnDetail(turn, fakeGame);
    const updatedFakeGame = processTurn(turn, fakeGame);
    fakeGame = updatedFakeGame;
    detailedTurns.push(turnDetail);
  }

  return detailedTurns;
};

function renderTurnDetail(
  turn: string,
  {
    whosTurn,
    boardMap,
    turns,
    castle,
  }: Pick<GameState, "whosTurn" | "boardMap" | "turns" | "castle">
): TurnDetail {
  const { to, from, promotion } = splitTurn(turn);
  const isCastleTurn = isCastleMove(turn, { whosTurn, boardMap });
  const isEnPassantTurn = isEnPassantMove(turn, { boardMap, turns });
  const isTwoSquarePawnTurn = isTwoSquarePawnMove(turn, { boardMap });
  const pieceMoved = boardMap[from]?.pce;
  if (!pieceMoved) {
    throw new Error("there should be a piece moved");
  }
  const pieceCut = isEnPassantTurn
    ? getOpponentPawnPiece(whosTurn)
    : boardMap[to]?.pce || null;
  return {
    to,
    from,
    whosTurn,
    isEnPassantTurn,
    isCastleTurn,
    isTwoSquarePawnTurn,
    pieceCut,
    pieceMoved,
    promotion: promotion || null,
    turn,
    boardMap: dd(boardMap),
    castle: dd(castle),
  };
}

function getOpponentPawnPiece(whosTurn: PlayerColor) {
  return whosTurn === "b" ? "wp" : "bp";
}

function isTwoSquarePawnMove(
  turn: string,
  { boardMap }: Pick<GameState, "boardMap">
) {
  // check if the from cell is a pawn
  const { to, from } = splitTurn(turn);
  // check if to cell is 2 cells fwd
  const isPawn = boardMap[from]?.pce[1] === "p";
  const turnPlayersColor = boardMap[from]?.pce[0] as PlayerColor;
  const isTwoCellsFwd = getTwoCellsFwd(from, turnPlayersColor) === to;
  // check if from cell is home row
  const isFromCellHomeRow = isHomeRow(from, turnPlayersColor);
  return isPawn && isTwoCellsFwd && isFromCellHomeRow;
}

export const amIInCheck = ({
  myColor,
  gameState,
}: {
  myColor: PlayerColor;
  gameState: Pick<GameState, "boardMap">;
}) => {
  const { boardMap } = gameState;
  return isThisColorInCheck(myColor, boardMap);
};
