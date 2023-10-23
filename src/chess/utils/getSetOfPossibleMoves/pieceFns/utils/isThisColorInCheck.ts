import { BoardMap, Coord, PlayerColor } from "@/chess/utils/types";
import { diagonalFunctions as d } from "./diagonalFunctions";
import { orthogonalFunctions as o } from "./orthogonalFunctions";
import { getKnightCoords } from "./getKnightCoords";

export const isThisColorInCheck = (color: PlayerColor, boardMap: BoardMap) => {
  const kingEntry = Object.entries(boardMap).find(([coords, piece]) => {
    return piece.pce === (color === "b" ? "bk" : "wk");
  });
  if (!kingEntry) throw new Error("should be unreachable code");
  const k = kingEntry[0] as Coord;
  const enemyColor = color === "b" ? "w" : "b";

  // check if pawns are attacking the king
  const coordsToCheckForPawns = (
    color === "b" ? [d.h1d(k), d.a1d(k)] : [d.h8d(k), d.a8d(k)]
  ).filter(Boolean);

  const isInCheckFromPawns = coordsToCheckForPawns.some((c) => {
    const p = boardMap[c];
    if (!p) return false;
    return "pqbk".includes(p.pce[1]) && p.pce[0] === enemyColor;
  });

  if (isInCheckFromPawns) return true;

  // check if another king is attacking the king
  const orthos = [o.o1(k), o.o8(k), o.oa(k), o.oh(k)].filter(Boolean);
  const isInCheckOrtho = orthos.some((c) => {
    const p = boardMap[c];
    if (!p) return false;
    return "qrk".includes(p.pce[1]) && p.pce[0] === enemyColor;
  });
  if (isInCheckOrtho) return true;
  const diags = [d.a1d(k), d.a8d(k), d.h1d(k), d.h8d(k)].filter(Boolean);
  const isInCheckDiag = diags.some((c) => {
    const p = boardMap[c];
    if (!p) return false;
    return "qbk".includes(p.pce[1]) && p.pce[0] === enemyColor;
  });

  if (isInCheckDiag) return true;

  // check if a knight is attacking the king
  const coordsToCheckForKnights = [...getKnightCoords(k)];
  const isInCheckFromKnights = coordsToCheckForKnights.some((c) => {
    const p = boardMap[c];
    if (!p) return false;
    return p.pce[1] === "h" && p.pce[0] === enemyColor;
  });

  if (isInCheckFromKnights) return true;

  // check orthogonally for queen and rook
  let ortho_a = o.oa(k);
  while (ortho_a) {
    const p = boardMap[ortho_a];
    if (!p) {
      ortho_a = o.oa(ortho_a);
      continue;
    }
    if (p.pce[0] === color) break;
    if ("qr".includes(p.pce[1]) && p.pce[0] === enemyColor) {
      return true;
    } else {
      break;
    }
  }

  let ortho_h = o.oh(k);
  while (ortho_h) {
    const p = boardMap[ortho_h];
    if (!p) {
      ortho_h = o.oh(ortho_h);
      continue;
    }
    if (p.pce[0] === color) break;
    if ("qr".includes(p.pce[1]) && p.pce[0] === enemyColor) {
      return true;
    } else {
      break;
    }
  }

  let ortho_1 = o.o1(k);
  while (ortho_1) {
    const p = boardMap[ortho_1];
    if (!p) {
      ortho_1 = o.o1(ortho_1);
      continue;
    }
    if (p.pce[0] === color) break;
    if ("qr".includes(p.pce[1]) && p.pce[0] === enemyColor) {
      return true;
    } else {
      break;
    }
  }

  let ortho_8 = o.o8(k);
  while (ortho_8) {
    const p = boardMap[ortho_8];
    if (!p) {
      ortho_8 = o.o8(ortho_8);
      continue;
    }
    if (p.pce[0] === color) break;
    if ("qr".includes(p.pce[1]) && p.pce[0] === enemyColor) {
      return true;
    } else {
      break;
    }
  }

  // check diagonally for queen and bishop
  let diag_a1 = d.a1d(k);
  while (diag_a1) {
    const p = boardMap[diag_a1];
    if (!p) {
      diag_a1 = d.a1d(diag_a1);
      continue;
    }
    if (p.pce[0] === color) break;
    if ("qb".includes(p.pce[1]) && p.pce[0] === enemyColor) {
      return true;
    } else {
      break;
    }
  }

  let diag_a8 = d.a8d(k);
  while (diag_a8) {
    const p = boardMap[diag_a8];
    if (!p) {
      diag_a8 = d.a8d(diag_a8);
      continue;
    }
    if (p.pce[0] === color) break;
    if ("qb".includes(p.pce[1]) && p.pce[0] === enemyColor) {
      return true;
    } else {
      break;
    }
  }

  let diag_h1 = d.h1d(k);
  while (diag_h1) {
    const p = boardMap[diag_h1];
    if (!p) {
      diag_h1 = d.h1d(diag_h1);
      continue;
    }
    if (p.pce[0] === color) break;
    if ("qb".includes(p.pce[1]) && p.pce[0] === enemyColor) {
      return true;
    } else {
      break;
    }
  }

  let diag_h8 = d.h8d(k);
  while (diag_h8) {
    const p = boardMap[diag_h8];
    if (!p) {
      diag_h8 = d.h8d(diag_h8);
      continue;
    }
    if (p.pce[0] === color) break;
    if ("qb".includes(p.pce[1]) && p.pce[0] === enemyColor) {
      return true;
    } else {
      break;
    }
  }

  // if it gets to this point, the king is not in check
  return false;
};