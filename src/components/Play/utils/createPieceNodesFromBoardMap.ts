import { createNewBoardMap, dd } from "@/chess/utils/helpers";
import { BoardMap, CoordOrCut, PieceSymbol } from "@/chess/utils/types";

const initPieceNodes = Object.entries(createNewBoardMap())
  .map((e) => {
    const [_coordString, { id, pce }] = e;
    const initPos = pce[0] === "w" ? "xb" : "xw";
    return { [id]: { pce, pos: initPos } };
  })
  .reduce((o, el) => {
    return {
      ...o,
      ...el,
    };
  }, {}) as {
  [id: string]: {
    pce: PieceSymbol;
    pos: CoordOrCut;
  };
};

export function createPieceNodesFromBoardMap(boardMap: BoardMap): {
  [id: string]: {
    pce: PieceSymbol;
    pos: CoordOrCut;
  };
} {
  return Object.entries(boardMap).reduce((pieceNodes, entry) => {
    const [coordString, { id, pce }] = entry;
    const pos = coordString as CoordOrCut;
    return {
      ...pieceNodes,
      [id]: { pce, pos },
    };
  }, dd(initPieceNodes));
}
