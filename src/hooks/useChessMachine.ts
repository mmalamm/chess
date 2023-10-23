import { chessMachine } from "@/chess/machine";
import {
  getPossibleMoves,
  getPossibleMovesWithoutCheckFilter,
} from "@/chess/utils/getSetOfPossibleMoves/getPossibleMoves";
import { createNewGame, getDetailedTurns } from "@/chess/utils/helpers";
import { createPieceNodesFromBoardMap } from "@/components/Play/utils/createPieceNodesFromBoardMap";
import { useMachine, useSelector } from "@xstate/react";

export const useChessMachine = () => {
  const [state, send, actor] = useMachine(chessMachine, {
    context: {
      gameData: createNewGame(),
      uiData: {
        pointOfView: "w",
        selectedCell: null,
        promotionTurn: null,
        settings: {
          inputType: "click",
        },
      },
    },
  });

  const pieceNodes = useSelector(actor, (selectorState) => {
    const boardMap = selectorState.context.gameData?.boardMap;
    if (!boardMap) throw new Error("there must be a boardmap");
    return createPieceNodesFromBoardMap(boardMap);
  });

  const pinnedMoves = useSelector(actor, (selectorState) => {
    const selectedCell = selectorState.context.uiData.selectedCell;
    if (!selectedCell) return new Set([]);
    const { boardMap, turns, castle, whosTurn } =
      selectorState.context.gameData;
    const possibleMoves = getPossibleMoves(selectedCell, {
      boardMap,
      turns,
      castle,
      whosTurn,
    });
    const unfiltered = getPossibleMovesWithoutCheckFilter(selectedCell, {
      boardMap,
      turns,
      castle,
      whosTurn,
    });
    const a = [...unfiltered].filter((c) => !possibleMoves.has(c));
    return new Set(a);
  });

  const lastTurnDetailed = useSelector(actor, (selectorState) => {
    const detailedTurns = getDetailedTurns(
      selectorState.context.gameData.turns
    );
    return detailedTurns.at(-1);
  });

  const selectors = {
    pieceNodes,
    pinnedMoves,
    lastTurnDetailed,
  };

  return { state, send, selectors };
};
