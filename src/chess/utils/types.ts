export type GameState ={
  whosTurn: PlayerColor;
  turns: TurnString[];
  castle: {
    w: CastleTracker;
    b: CastleTracker;
  };
  winner: PlayerColor | null;
  boardMap: BoardMap;
};

export type PlayerColor = "b" | "w";

export type CoordLetter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type CoordNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Coord = `${CoordLetter}${CoordNumber}`;

type NormalTurn = `${Coord}${Coord}`;
type PromotionTurn = `${NormalTurn}_${PromotionOptions}`;

export type TurnString = NormalTurn | PromotionTurn;

export type CastleTracker = {
  queenSideRookMoved: boolean;
  kingSideRookMoved: boolean;
  kingMoved: boolean;
};

export type PieceLetter = "p" | "h" | "k" | "q" | "r" | "b";
export type PromotionOptions = Exclude<PieceLetter, "p" | "k">;

export type PieceSymbol = `${PlayerColor}${PieceLetter}`;

export type TurnDetail = {
  to: string;
  from: string;
  whosTurn: PlayerColor;
  pieceCut: PieceSymbol | null;
  pieceMoved: PieceSymbol;
  isEnPassantTurn: boolean | null;
  isCastleTurn: boolean;
  promotion: null | PromotionOptions;
  isTwoSquarePawnTurn: boolean;
  turn: string;
  boardMap: BoardMap;
  castle: {
    w: CastleTracker;
    b: CastleTracker;
  };
};

type BoardMapPiece = { pce: PieceSymbol; id: string };
export type BoardMap = Partial<Record<Coord, BoardMapPiece>>;